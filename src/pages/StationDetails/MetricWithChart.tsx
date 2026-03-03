import { Box, Text } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

export default function MetricWithChart({
  title,
  value,
  data,
  color,
}: {
  title: string;
  value: string;
  data: { time: string; value: number }[];
  color: string;
}) {
  return (
    <Box bg="dark.400" border="1px solid #1F2937" borderRadius="md" p={5}>
      <Text fontSize="sm" color="gray.400" mb={2}>
        {title}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" color="white" mb={4}>
        {value}
      </Text>

      <Box h="150px" ml={-4}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#3e4e68" strokeDasharray="3 3" />

            <XAxis dataKey="time" stroke="#fff" tick={{ fontSize: 12 }} />

            <YAxis
              stroke="#fff"
              tick={{ fontSize: 12 }}
              domain={["auto", "auto"]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0F172A",
                border: "1px solid #1F2937",
              }}
              labelStyle={{ color: "#fff" }}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
