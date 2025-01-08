import {
  ClientEvent,
  ClientOrganization,
  ClientSpeaker,
  ClientTalk,
  GroupedTalks,
} from "@/types/client";
import { Event, Location, Organization, Speaker, Talk } from "@prisma/client";
import dayjs from "dayjs";
import { Locale } from "./pageTypes";

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

export const formatClientSpeaker = (
  speaker: Speaker,
  locale: Locale,
): ClientSpeaker => ({
  slug: speaker.slug,
  name: speaker.name,
  desc: speaker[`headline_${locale}`],
  image: speaker.image_id || "",
  social: {
    website: speaker.website_url,
    twitter: speaker.twitter_url,
    email: speaker.email,
    github: speaker.github_url,
    linkedIn: speaker.linkedin_url,
  },
});

export const formatClientOrganization = (
  org: Organization,
  locale: Locale,
): ClientOrganization => ({
  name: org[`name_${locale}`],
  description: org[`description_${locale}`],
  image: org.image_id,
});

export const formatClientTalk = (
  talk: Talk & {
    event?: Event & { location?: Location };
    speakers?: Speaker[];
  },
  locale: Locale,
): ClientTalk => ({
  slug: talk.slug,
  startDateTime: dayjs(talk.start_date).format("YYYY-MM-DDTHH:mm:ssZ"),
  endDateTime: dayjs(talk.end_date).format("YYYY-MM-DDTHH:mm:ssZ"),
  language: "EN",
  location: talk?.event?.location?.[`name_${locale}`] || "N/A",
  speakers: talk?.speakers?.map?.((speaker) => speaker.name) || [],
  image: talk.event?.image_id || "",
  title: talk[`title_${locale}`],
  description: talk[`description_${locale}`],
  type: talk.type,
});

export const formatClientEvent = (
  event: Event & {
    location?: Location;
    talks: (Talk & { speakers: Speaker[] })[];
    sponsors: Organization[];
  },
  locale: Locale,
): ClientEvent => {
  const allSpeakers = event.talks.flatMap((event) => event.speakers);

  const uniqueSpeakers = Array.from(
    allSpeakers
      .reduce((map, speaker) => map.set(speaker.slug, speaker), new Map())
      .values(),
  );

  return {
    slug: event.slug,
    image: event.image_id,
    name: event[`name_${locale}`],
    description: event[`description_${locale}`],
    startDateTime: dayjs(event.start_date).format("YYYY-MM-DDTHH:mm:ssZ"),
    endDateTime: dayjs(event.end_date).format("YYYY-MM-DDTHH:mm:ssZ"),
    location: event?.location?.[`name_${locale}`] || "",
    talks: event.talks.map((item) => formatClientTalk(item, locale)),
    speakers: uniqueSpeakers.map((speaker) =>
      formatClientSpeaker(speaker, locale),
    ),
    sponsors: event.sponsors.map((item) =>
      formatClientOrganization(item, locale),
    ),
  };
};
