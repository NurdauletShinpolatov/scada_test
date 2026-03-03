import type { LogLevel } from "../types";

export const STATUS_COLORS = {
  online: "green",
  warning: "orange",
  offline: "red",
} as const;

export const LOG_LEVEL_COLORS: Record<LogLevel, string> = {
  info: "blue",
  warning: "yellow",
  critical: "red",
};