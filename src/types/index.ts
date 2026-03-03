export interface Station {
  id: string;
  name: string;
  location: string;
  status: "online" | "warning" | "offline";
  temperature: number | null;
  pressure: number | null;
  voltage: number | null;
  lastUpdated: string;
}

export interface LogItem {
  id: string;
  timestamp: string;
  station: string;
  level: "info" | "warning" | "critical";
  message: string;
}


export type LogLevel = "info" | "warning" | "critical";