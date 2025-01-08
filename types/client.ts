import { $Enums } from "@prisma/client";
export interface ClientTalk {
  slug: string;
  type: $Enums.TalkType;
  startDateTime: string;
  endDateTime: string;
  language: string;
  location: string;
  speakers: string[];
  imageURL: string;
  title: string;
  description: string;
}

export interface ClientSpeaker {
  slug: string;
  name: string;
  desc: string;
  social: {
    website?: string;
    twitter?: string;
    github?: string;
    linkedIn?: string;
    facebook?: string;
    email?: string;
  };
}
