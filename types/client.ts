import { $Enums } from "@prisma/client";
export interface ClientTalk {
  slug: string;
  type: $Enums.TalkType;
  startDateTime: string;
  endDateTime: string;
  language: string;
  location: string;
  speakers: string[];
  image: string;
  title: string;
  description: string;
}

export interface ClientSpeaker {
  slug: string;
  name: string;
  desc: string;
  image: string;
  social: {
    website?: string;
    twitter?: string;
    github?: string;
    linkedIn?: string;
    facebook?: string;
    email?: string;
  };
}

export interface GroupedTalks {
  day: number;
  date: string;
  talks: ClientTalk[];
}

export interface ClientOrganization {
  name: string;
  description: string;
  image: string;
}

export interface ClientEvent {
  slug: string;
  name: string;
  image: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  talks: ClientTalk[];
  speakers: ClientSpeaker[];
  sponsors: ClientOrganization[];
}
