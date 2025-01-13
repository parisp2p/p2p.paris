import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatTime = (isoString: string) => {
  return dayjs(isoString).tz("Europe/Berlin").format("HH[H]mm");
};

export const formatDate = (isoString: string) => {
  return dayjs(isoString).tz("Europe/Berlin").format("MMMM D, YYYY");
};
