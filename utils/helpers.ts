import { ClientTalk, GroupedTalks } from "@/types/client";
import dayjs from "dayjs";

export const groupTalksByDay = (talks: ClientTalk[]): GroupedTalks[] => {
  return talks.reduce<GroupedTalks[]>((acc, talk) => {
    const eventDate = dayjs(talk.startDateTime).format("YYYY-MM-DD");
    const dayIndex = acc.findIndex((day) => day.date === eventDate);

    if (dayIndex > -1) {
      acc[dayIndex].talks.push(talk);
    } else {
      acc.push({
        day: acc.length,
        date: eventDate,
        talks: [talk],
      });
    }

    return acc;
  }, []);
};
