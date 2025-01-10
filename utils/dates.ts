import dayjs from "dayjs";

export const formatTime = (isoString: string) => {
  return dayjs(isoString).format("HH[H]mm");
};

export const formatDate = (isoString: string) => {
  return dayjs(isoString).format("MMMM D, YYYY");
};
