import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  Grid,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { stations } from "../../simulation/stations";
import { LOG_LEVEL_COLORS, STATUS_COLORS } from "../../utils/constants";
import { logs } from "../../simulation/logs";
import dayjs from "dayjs";
import type { LogLevel } from "../../types";
import MetricWithChart from "./MetricWithChart";
import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";

export default function StationDetails() {
  const { id } = useParams();
  const station = stations.find((station) => station.id === id);
  const relevantLogs = logs.filter((log) => log?.station === id);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editName, setEditName] = useState(station?.name ?? "");
  const [editLocation, setEditLocation] = useState(station?.location ?? "");

  const generateSeries = (base: number, variance: number) =>
    Array.from({ length: 12 }, (_, i) => ({
      time: dayjs()
        .subtract(11 - i, "minute")
        .format("HH:mm"),
      value: +(base + (Math.random() - 0.5) * variance).toFixed(2),
    }));

  const tempData = useMemo(
    () => (station?.temperature ? generateSeries(station.temperature, 10) : []),
    [station?.temperature]
  );
  const pressureData = useMemo(
    () => station?.pressure ? generateSeries(station.pressure, 1): [],
    [station?.pressure]
  )
  const voltageData = useMemo(
    () => station?.voltage ? generateSeries(station.voltage, 15) : [],
    [station?.voltage]
  );

  const onModalClose = () => {
    onClose();
    setEditName(station?.name ?? "");
    setEditLocation(station?.location ?? "");
  };

  const handleSave = () => {
    if (!station) return;

    // Find the index in the original array
    const idx = stations.findIndex((s) => s.id === station.id);
    if (idx !== -1) {
      stations[idx] = {
        ...stations[idx],
        name: editName,
        location: editLocation,
      };
    }

    onModalClose();
  };

  return (
    <Box p={6}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="md" color="white">
            {station?.name}
          </Heading>
          <Text fontSize="sm" color="gray.400">
            Location: {station?.location}
          </Text>
        </Box>

        <Flex align="center" gap={2}>
          <IconButton
            aria-label="Edit Station"
            variant="primary"
            h='35px'
            w='35px'
            icon={<Icon icon="mdi:pencil-outline" />}
            size="sm"
            onClick={onOpen}
          />
          <Badge
            rounded={8}
            colorScheme={STATUS_COLORS[station?.status ?? "offline"]}
            fontSize="0.8em"
            p={2}
          >
            {station?.status?.toUpperCase()}
          </Badge>
        </Flex>
      </Flex>

      {/* Metrics Section */}
      <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={6}>
        <MetricWithChart
          title="Temperature"
          value={`${station?.temperature ?? "--"} °C`}
          data={tempData}
          color="#38bdf8"
        />
        <MetricWithChart
          title="Pressure"
          value={`${station?.pressure ?? "--"} bar`}
          data={pressureData}
          color="#47b12e"
        />
        <MetricWithChart
          title="Voltage"
          value={`${station?.voltage ?? "--"} V`}
          data={voltageData}
          color="#f59e0b"
        />
      </Grid>

      {/* Event Log */}
      <Box bg="dark.400" borderRadius="md" border="1px solid #1F2937" p={6}>
        <Heading size="sm" mb={4} color="gray.300">
          Event Log
        </Heading>

        <Flex direction="column" gap={3}>
          {relevantLogs?.map((log) => (
            <LogItem
              key={log.id}
              level={log.level}
              time={dayjs(log?.timestamp).format("HH:mm:ss MMMM DD, YYYY")}
              message={log.message}
            />
          ))}
        </Flex>
      </Box>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent bg="dark.400" color="white">
          <ModalHeader>Edit Station</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" gap={4}>
            <Input
              placeholder="Station Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <Input
              placeholder="Location"
              value={editLocation}
              onChange={(e) => setEditLocation(e.target.value)}
            />
          </ModalBody>
          <ModalFooter gap={3}>
            <Button variant="outline" onClick={onModalClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

function LogItem({
  level,
  time,
  message,
}: {
  level: LogLevel;
  time: string;
  message: string;
}) {
  return (
    <Flex
      justify="space-between"
      fontSize="sm"
      color="gray.300"
      alignItems="center"
    >
      <Text>{message}</Text>
      <Flex alignItems="center" gap={4}>
        <Badge
          w="70px"
          textAlign="center"
          colorScheme={LOG_LEVEL_COLORS[level]}
        >
          {level.toUpperCase()}
        </Badge>
        <Text color="gray.500">{time}</Text>
      </Flex>
    </Flex>
  );
}
