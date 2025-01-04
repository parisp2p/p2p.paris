import EventEditor, { EventEditorContent } from "@/components/editor/event";
import LocationEditor, {
  LocationEditorContent,
} from "@/components/editor/location";
import PageEditor, { PageEditorContent } from "@/components/editor/page";
import SideBar from "@/components/editor/SideBar";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";

const BreadCrumb = ({ breadCrumb }: { breadCrumb: string[] }) => {
  return (
    <div className="flex gap-4 mt-4">
      {breadCrumb.map((slug, i) => (
        <div
          className={`flex gap-4 ${
            i < breadCrumb.length - 1 ? "text-gray-500" : "text-gray-200"
          } `}
          key={`bread-${i}`}
        >
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
  type: "page" | "event" | "location";
  slug: string | "new";
};

export default function Editor({
  pages,
  events,
  locations,
}: {
  pages: PageEditorContent[];
  events: EventEditorContent[];
  locations: LocationEditorContent[];
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
            <EventEditor event={events.find((e) => e.slug === focus.slug)} />
          )}
          {focus.type === "location" && (
            <LocationEditor
              location={locations.find(
                (location) => location.slug === focus.slug,
              )}
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
    },
  };
}
