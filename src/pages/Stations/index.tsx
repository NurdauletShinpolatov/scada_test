import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import CTable from "../../components/ui/CTable";
import Pagination from "../../components/ui/Pagination";
import { stations } from "../../simulation/stations";
import { columns } from "./columns";
import type { Station } from "../../types";
import { Icon } from "@iconify/react";

const pageSize = 10;

type StatusFilter = "all" | "online" | "warning" | "offline";

export default function StationsPage() {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  const initialStatus = searchParams.get("status") as StatusFilter | null;

  const isValidStatus = (value: string | null): value is StatusFilter =>
    ["online", "warning", "offline"].includes(value ?? "");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    isValidStatus(initialStatus) ? initialStatus : "all"
  );
  const [currentPage, setCurrentPage] = useState(1);

  const onRowClick = (row: Station) => navigate(`/stations/${row.id}`);

  const filteredStations = useMemo(() => {
    return stations.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ? true : s.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const paginatedStations = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredStations.slice(start, start + pageSize);
  }, [filteredStations, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  return (
    <Box bg="#0F172A" minH="100vh" p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md" color="white">
          Stations Overview
        </Heading>

        <Flex gap={4} alignItems="center">
          <InputGroup w="300px">
            <InputLeftElement pointerEvents="none">
              <Icon icon="material-symbols:search-rounded" />
            </InputLeftElement>
            <Input
              placeholder="Search stations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
            />
          </InputGroup>

          <Select
            w="180px"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="warning">Warning</option>
            <option value="offline">Offline</option>
          </Select>
        </Flex>
      </Flex>

      <CTable
        columns={columns}
        data={paginatedStations}
        isRowClickable={true}
        onRowClick={onRowClick}
      />

      <Pagination
        currentPage={currentPage}
        totalItems={filteredStations.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </Box>
  );
}
