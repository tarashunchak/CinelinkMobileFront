import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function timestamp(date: Date) {
  return `${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`
};

export function calcLastSeen(timestamp: string): string {
  dayjs.extend(relativeTime);

  const lastSeen = dayjs(timestamp);
  return lastSeen.fromNow();
}