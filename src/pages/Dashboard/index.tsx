import {
  Box,
  Flex,
  Grid,
  Text,
  Badge,
  Heading,
} from "@chakra-ui/react";
import { stations } from "../../simulation/stations";
import { useNavigate } from "react-router-dom";
import { STATUS_COLORS } from "../../utils/constants";

const STATUSES = ["online", "warning", "offline"] as const;
const statStyles = {
  p: 4,
  cursor: "pointer",
  borderRadius: "md",
  bg: "dark.400",
  flex: 1,
  _hover: {
    bg: "dark.300"
  }
}

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box bg="dark" minH="100vh" p={6}>
      {/* Topbar */}
      <Flex justify="space-between" gap={4} alignItems="center" mb={6}>
        <Heading size="md" color="white">
          SCADA Dashboard
        </Heading>

        <Text>
          System status:{" "}
          <Box as="span" color="secondary" fontWeight={700}>
            Operatable
          </Box>
        </Text>
      </Flex>

      {/* Global Stats */}
      <Flex gap={4} mb={6}>
        <Box
          onClick={() => navigate("/stations")}
          sx={statStyles}
        >
          <Text fontSize="sm" color="gray.400">
            Total Stations
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            {stations.length}
          </Text>
        </Box>
        {STATUSES.map((status) => (
          <Box
            key={status}
            onClick={() => navigate(`/stations?status=${status}`)}
            sx={statStyles}
          >
            <Text fontSize="sm" color="gray.400" textTransform="capitalize">
              {status}
            </Text>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={`${STATUS_COLORS[status]}.400`}
            >
              {stations.filter((s) => s.status === status).length}
            </Text>
          </Box>
        ))}
      </Flex>

      {/* Station Cards */}
      <Heading mb={6}>Attention needed stations:</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(260px, 1fr))" gap={4}>
        {stations
          .filter((st) => st.status !== "online")
          .map((station) => (
            <Flex
              key={station.id}
              direction="column"
              bg="dark.400"
              _hover={{
                bg: "dark.300",
              }}
              cursor="pointer"
              onClick={() => navigate(`/stations/${station.id}`)}
              p={4}
              borderRadius="md"
              border="1px solid #1F2937"
            >
              <Box flexGrow={1}>
                <Flex justify="space-between" alignItems="start" gap={2} mb={2}>
                  <Text fontWeight="700" color="white">
                    {station.name}
                  </Text>
                  <Badge colorScheme={STATUS_COLORS[station.status]}>
                    {station.status.toUpperCase()}
                  </Badge>
                </Flex>
                <Text fontSize="sm" color="gray.300" mb={1}>
                  Temperature: {station.temperature ?? "--"}°C
                </Text>
                <Text fontSize="sm" color="gray.300" mb={1}>
                  Pressure: {station.pressure ?? "--"} bar
                </Text>
                <Text fontSize="sm" color="gray.300">
                  Voltage: {station.voltage ?? "--"} V
                </Text>
              </Box>
              <Text align="end" fontSize="xs" color="gray.400" mt={2}>
                Updated: {station.lastUpdated}
              </Text>
            </Flex>
          ))}
      </Grid>
    </Box>
  );
}
