import { Badge, Text } from "@chakra-ui/react";
import type { CTableColumn } from "../../components/ui/CTable";
import type { Station } from "../../types";
import { STATUS_COLORS } from "../../utils/constants";

export const columns: CTableColumn<Station>[] = [
  { header: "Name", accessor: "name" },
  { header: "Location", accessor: "location" },
  {
    header: "Status",
    accessor: "status",
    render: (row) => (
      <Badge colorScheme={STATUS_COLORS[row.status]}>
        {row.status.toUpperCase()}
      </Badge>
    ),
  },
  {
    header: "Temperature",
    accessor: "temperature",
    render: (row) => `${row.temperature ?? "--"} °C`,
  },
  {
    header: "Pressure",
    accessor: "pressure",
    render: (row) => `${row.pressure ?? "--"} bar`,
  },
  {
    header: "Voltage",
    accessor: "voltage",
    render: (row) => `${row.voltage ?? "--"} V`,
  },
  {
    header: "Last Update",
    accessor: "lastUpdated",
    render: (row) => (
      <Text fontSize="sm">
        {row.lastUpdated}
      </Text>
    ),
  },
];