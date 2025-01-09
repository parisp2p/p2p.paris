import ItemEditor from "@/components/editor/ItemEditor";

import SideBar from "@/components/editor/EditorSideBar";
import PageEditor, { PageEditorContent } from "@/components/editor/page";
import {
  defaultEvent,
  defaultLocation,
  defaultOrganization,
  defaultSpeaker,
  defaultTalk,
  EditorFocusedItemType,
  EventEditorContent,
  LocationEditorContent,
  OrganizationEditorContent,
  SpeakerEditorContent,
  TalkEditorContent,
} from "@/components/editor/types";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";

const BreadCrumb = ({ breadCrumb }: { breadCrumb: string[] }) => {
  return (
    <div className="flex gap-4 mt-4 text-sm uppercase">
      {breadCrumb.map((slug, i) => (
        <div className={`flex gap-4 text-gray-500`} key={`bread-${i}`}>
          <p className="hover:cursor-pointer hover:underline underline-offset-4">
            {slug}
          </p>
          {i < breadCrumb.length - 1 && <p>{">"}</p>}
        </div>
      ))}
    </div>
  );
};

export type EditorFocusedItem = {
  type: EditorFocusedItemType;
  slug: string | "new";
};

export default function Editor({
  pages,
  events,
  locations,
  speakers,
  organizations,
  talks,
}: {
  pages: PageEditorContent[];
  events: EventEditorContent[];
  locations: LocationEditorContent[];
  speakers: SpeakerEditorContent[];
  organizations: OrganizationEditorContent[];
  talks: TalkEditorContent[];
}) {
  const [breadCrumb, setBreadCrumb] = useState<string[]>(["/", "page", "home"]);
  const [focus, setFocus] = useState<EditorFocusedItem>({
    type: "page",
    slug: "home",
  });

  const handleMenuSelect = ({ type, slug }: EditorFocusedItem): undefined => {
    console.log("Selected", type, slug);
    setFocus({ type, slug });
    setBreadCrumb(["/", type, slug]);
  };

  return (
    <div className="flex justify-between mr-4 gap-4">
      <SideBar
        pages={pages}
        events={events}
        locations={locations}
        speakers={speakers}
        organizations={organizations}
        talks={talks}
        onSelect={handleMenuSelect}
      />
      <div className="flex flex-col w-full gap-4">
        <BreadCrumb breadCrumb={breadCrumb} />
        <div className="bg-[#18181A] rounded-md w-full p-8 h-full">
          {focus.type === "page" && (
            <PageEditor
              page={
                pages.find(
                  (page) => page.slug === focus.slug,
                ) as PageEditorContent
              }
            />
          )}
          {focus.type === "event" && (
            <ItemEditor
              item={
                focus.slug === "new"
                  ? defaultEvent
                  : events.find((event) => event.slug === focus.slug)
              }
              route="events"
            />
          )}
          {focus.type === "location" && (
            <ItemEditor
              item={
                focus.slug === "new"
                  ? defaultLocation
                  : locations.find((item) => item.slug === focus.slug)
              }
              route="locations"
            />
          )}
          {focus.type === "speaker" && (
            <ItemEditor
              item={
                focus.slug === "new"
                  ? defaultSpeaker
                  : speakers.find((item) => item.slug === focus.slug)
              }
              route="speakers"
            />
          )}
          {focus.type === "organization" && (
            <ItemEditor
              item={
                focus.slug === "new"
                  ? defaultOrganization
                  : organizations.find((item) => item.slug === focus.slug)
              }
              route="organizations"
            />
          )}
          {focus.type === "talk" && (
            <ItemEditor
              item={
                focus.slug === "new"
                  ? defaultTalk
                  : talks.find((item) => item.slug === focus.slug)
              }
              route="talks"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // fetch pages using prisma
  const prisma = new PrismaClient();
  const pages = await prisma.page.findMany();

  const events = await prisma.event.findMany();
  const locations = await prisma.location.findMany();
  const speakers = await prisma.speaker.findMany();
  const organizations = await prisma.organization.findMany();
  const talks = await prisma.talk.findMany();

  // return pages as props
  return {
    props: {
      pages: pages.map((page) => ({
        slug: page.slug,
        content_en: JSON.parse(page.content_en),
        content_fr: JSON.parse(page.content_fr),
      })),
      events: events.map((event) => ({
        ...event,
        start_date: event.start_date.toISOString(),
        end_date: event.end_date.toISOString(),
      })),
      locations,
      speakers,
      organizations,
      talks: talks.map((t) => ({
        ...t,
        start_date: t.start_date.toISOString(),
        end_date: t.end_date.toISOString(),
      })),
    },
  };
}
