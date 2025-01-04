import { Event } from "@prisma/client";

export type ItemTab = "editor" | "preview-en" | "preview-fr";

export type EditorFocusedItemType =
  | "page"
  | "event"
  | "location"
  | "speaker"
  | "talk"
  | "organization";

export type SpeakerEditorContent = {
  slug: string;
  name: string;
  headline_en: string;
  headline_fr: string;
  description_en: string;
  description_fr: string;
  image_id: string;
  website_url: string;
  twitter_url: string;
  github_url: string;
  linkedin_url: string;
  facebook_url: string;
  email: string;
  event: Event | null;
  talkSlug: string;
};

export const defaultSpeaker: SpeakerEditorContent = {
  slug: "new",
  name: "",
  headline_en: "",
  headline_fr: "",
  description_en: "",
  description_fr: "",
  image_id: "",
  website_url: "",
  twitter_url: "",
  github_url: "",
  linkedin_url: "",
  facebook_url: "",
  email: "",
  event: null,
  talkSlug: "",
};

export type OrganizationEditorContent = {
  slug: string;
  name: string;
  description_en: string;
  description_fr: string;
  image_id: string;
  website_url: string;
  twitter_url: string;
  github_url: string;
  linkedin_url: string;
  facebook_url: string;
  speakers: SpeakerEditorContent[];
  tags: string[];
  event_id: string;
};

export const defaultOrganization: OrganizationEditorContent = {
  slug: "new",
  name: "",
  description_en: "",
  description_fr: "",
  image_id: "",
  website_url: "",
  twitter_url: "",
  github_url: "",
  linkedin_url: "",
  facebook_url: "",
  speakers: [],
  tags: [],
  event_id: "",
};

export type EventEditorContent = {
  slug: string;
  name_en: string;
  name_fr: string;
  description_en: string;
  description_fr: string;
  start_date: string;
  end_date: string;
  location: string;
  speakers: SpeakerEditorContent[];
  talks: string[];
};

export const defaultEvent: EventEditorContent = {
  slug: "new",
  name_en: "",
  name_fr: "",
  description_en: "",
  description_fr: "",
  start_date: "",
  end_date: "",
  location: "",
  speakers: [],
  talks: [],
};

export type TalkType =
  | "TALK"
  | "WORKSHOP"
  | "PARTY"
  | "PROJECTION"
  | "STAND"
  | "MEET_UP";

export type TalkEditorContent = {
  slug: string;
  type: TalkType;
  title_en: string;
  title_fr: string;
  description_en: string;
  description_fr: string;
  start_time: string;
  end_time: string;
  speakers: SpeakerEditorContent[];
  tags: string[];
  event_id: string;
};

export const defaultTalk: TalkEditorContent = {
  slug: "new",
  type: "TALK",
  title_en: "",
  title_fr: "",
  description_en: "",
  description_fr: "",
  start_time: "",
  end_time: "",
  speakers: [],
  tags: [],
  event_id: "",
};

export type LocationEditorContent = {
  slug: string;
  name_en: string;
  name_fr: string;
  image_id: string;
  description_en: string;
  description_fr: string;
  address: string;
  events: EventEditorContent[];
};

export const defaultLocation: LocationEditorContent = {
  slug: "new",
  name_en: "",
  name_fr: "",
  image_id: "",
  description_en: "",
  description_fr: "",
  address: "",
  events: [],
};
