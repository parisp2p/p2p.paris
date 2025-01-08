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
