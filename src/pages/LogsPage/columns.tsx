import { Badge, Text } from "@chakra-ui/react";
import type { CTableColumn } from "../../components/ui/CTable";
import type { LogItem } from "../../types";
import { LOG_LEVEL_COLORS } from "../../utils/constants";
import dayjs from 'dayjs';
import { stations } from "../../simulation/stations";

export const columns: CTableColumn<LogItem>[] = [
  {
    header: "Message",
    accessor: "message",
    render: (row) => <Text color="gray.200">{row.message}</Text>,
  },
  {
    header: "Station",
    accessor: "station",
    render: (row) => <Text color="white">{stations[+row?.station].name}</Text>,
  },
  {
    header: "Level",
    accessor: "level",
    render: (row) => (
      <Badge colorScheme={LOG_LEVEL_COLORS[row.level]}>
        {row.level.toUpperCase()}
      </Badge>
    ),
  },
  {
    header: "Datetime",
    accessor: "timestamp",
    render: (row) => (
      <Text fontSize="sm" color="gray.400">
        {dayjs(row.timestamp).format("HH:mm:ss")}
        <br />
        {dayjs(row.timestamp).format("MMMM DD, YYYY")}
      </Text>
    ),
  },
];