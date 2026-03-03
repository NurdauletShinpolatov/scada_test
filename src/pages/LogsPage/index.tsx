import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react";

import CTable from "../../components/ui/CTable";
import Pagination from "../../components/ui/Pagination";
import { logs } from "../../simulation/logs";
import type { LogLevel } from "../../types";
import { columns } from "./columns";
import { stations } from "../../simulation/stations";

const PAGE_SIZE = 10 as const;

export default function LogsPage() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<"all" | LogLevel>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.message.toLowerCase().includes(search.toLowerCase()) ||
        stations[+log?.station]?.name.toLowerCase().includes(search.toLowerCase());

      const matchesLevel =
        levelFilter === "all" ? true : log.level === levelFilter;

      return matchesSearch && matchesLevel;
    });
  }, [search, levelFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, levelFilter]);

  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredLogs.slice(start, start + PAGE_SIZE);
  }, [filteredLogs, currentPage]);

  return (
    <Box bg="#0F172A" minH="100vh" p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md" color="white">
          System Event Logs
        </Heading>

        <Flex gap={3}>
          <InputGroup w="300px">
            <InputLeftElement pointerEvents="none">
              <Icon icon="material-symbols:search-rounded" />
            </InputLeftElement>
            <Input
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
            />
          </InputGroup>

          <Select
            w="180px"
            value={levelFilter}
            onChange={(e) =>
              setLevelFilter(e.target.value as "all" | LogLevel)
            }
          >
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </Select>
        </Flex>
      </Flex>

      <CTable columns={columns} data={paginatedLogs} />

      <Pagination
        currentPage={currentPage}
        totalItems={filteredLogs.length}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </Box>
  );
}