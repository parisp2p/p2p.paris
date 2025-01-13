import { EditorCommandMenu } from "@/components/editor/EditorCommand";
import SideBar from "@/components/editor/EditorSideBar";
import ItemEditor from "@/components/editor/ItemEditor";
import PageEditor, { PageEditorContent } from "@/components/editor/page";
import {
  defaultEvent,
  defaultLocation,
  defaultOrganization,
  defaultSpeaker,
  defaultTalk,
  EditorFocusedItemType,
} from "@/components/editor/types";
import useEditorContent from "@/hooks/useEditorContent";
import { isEditorUser } from "@/utils/auth";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
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

export default function Editor() {
  const { data: session } = useSession();
  const {
    data: { pages, events, locations, speakers, organizations, talks },
    loading,
    error,
  } = useEditorContent();
  const router = useRouter();
  const [breadCrumb, setBreadCrumb] = useState<string[]>(["/", "page", "home"]);
  const [focus, setFocus] = useState<EditorFocusedItem>({
    type: "page",
    slug: "home",
  });

  const handleMenuSelect = ({ type, slug }: EditorFocusedItem): undefined => {
    setFocus({ type, slug });
    setBreadCrumb(["/", type, slug]);
  };

  if (session === null) {
    router.push("/editor/login");
  }

  return (
    <div className="flex justify-between mr-4 gap-4">
      {
        <SideBar
          pages={pages}
          events={events}
          locations={locations}
          speakers={speakers}
          organizations={organizations}
          talks={talks}
          onSelect={handleMenuSelect}
          key={`sidebar-${loading.toString()}`}
        />
      }
      <div className="flex flex-col w-full gap-4">
        <BreadCrumb breadCrumb={breadCrumb} />
        <div className="bg-[#18181A] rounded-md w-full p-8 h-full">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">ERROR: {error}</p>}

          <EditorCommandMenu
            setFocus={handleMenuSelect}
            pages={pages}
            events={events}
            locations={locations}
            speakers={speakers}
            organizations={organizations}
            talks={talks}
          />
          {focus.type === "page" && !loading && (
            <PageEditor
              page={
                pages.find(
                  (page) => page.slug === focus.slug,
                ) as PageEditorContent
              }
            />
          )}
          {focus.type === "event" && !loading && (
            <ItemEditor
              item={
                focus.slug === "new"
                  ? defaultEvent
                  : events.find((event) => event.slug === focus.slug)
              }
              route="events"
            />
          )}
          {focus.type === "location" && !loading && (
            <ItemEditor
              item={
                focus.slug === "new"
                  ? defaultLocation
                  : locations.find((item) => item.slug === focus.slug)
              }
              route="locations"
            />
          )}
          {focus.type === "speaker" && !loading && (
            <ItemEditor
              item={
                focus.slug === "new"
                  ? defaultSpeaker
                  : speakers.find((item) => item.slug === focus.slug)
              }
              route="speakers"
            />
          )}
          {focus.type === "organization" && !loading && (
            <ItemEditor
              item={
                focus.slug === "new"
                  ? defaultOrganization
                  : organizations.find((item) => item.slug === focus.slug)
              }
              route="organizations"
            />
          )}
          {focus.type === "talk" && !loading && (
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, {});

  if (!isEditorUser(session)) {
    return {
      redirect: {
        permanent: false,
        destination: "/editor/login",
      },
    };
  }

  // return pages as props
  return {
    props: {
      session,
    },
  };
}
