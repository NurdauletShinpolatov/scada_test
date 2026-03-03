import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { type ReactNode } from "react";

export interface CTableColumn<T> {
  header: string;
  accessor: keyof T;
  render?: (row: T) => ReactNode;
  width?: string;
}

interface CTableProps<T> {
  columns: CTableColumn<T>[];
  data: T[];
  isRowClickable?: boolean;
  onRowClick?: (row: T) => void;
}

export default function CTable<T extends { id: string | number }>({
  columns,
  data,
  isRowClickable = false,
  onRowClick,

}: CTableProps<T>) {
  return (
    <Box
      bg="dark.400"
      borderRadius="md"
      border="1px solid #1F2937"
      overflow="hidden"
    >
      <Table variant="simple">
        <Thead bg="primary">
          <Tr>
            {columns.map((col, index) => (
              <Th
                key={index}
                color="#fff"
                fontSize="xs"
                textTransform="uppercase"
                width={col.width}
              >
                {col.header}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {data.map((row) => (
            <Tr
              key={row.id}
              _hover={{ bg: "dark.300" }}
              cursor={isRowClickable ? "pointer" : "auto"}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col, index) => (
                <Td key={index} color="gray.200">
                  {col.render
                    ? col.render(row)
                    : (row[col.accessor] as ReactNode)}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
