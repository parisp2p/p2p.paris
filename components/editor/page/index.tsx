import Home from "@/pages";
import { PageContent } from "@/utils/pageTypes";
import { useState } from "react";
import EditorHeader from "../EditorHeader";
import PageContentEditor from "./RecursiveContentEditor";

export type PageEditorContent = {
  slug: string;
  content_en: PageContent;
  content_fr: PageContent;
};

const PageEditor = ({ page }: { page: PageEditorContent }) => {
  const [contentEn, setContentEn] = useState(page.content_en);
  const [contentFr, setContentFr] = useState(page.content_fr);
  const [tab, setTab] = useState<"editor" | "preview-en" | "preview-fr">(
    "editor",
  );

  const handleChange = (path: string[], value: string, isEn: boolean) => {
    const newData = isEn ? { ...contentEn } : { ...contentFr };

    // @ts-expect-error
    let cursor: any = newData;
    for (let i = 0; i < path.length - 1; i++) {
      cursor = cursor[path[i]];
    }

    cursor[path[path.length - 1]] = value;

    if (isEn) {
      setContentEn(newData);
    } else {
      setContentFr(newData);
    }
  };

  const handleSave = async () => {
    await fetch(`/api/pages/${page.slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content_en: contentEn,
        content_fr: contentFr,
      }),
    });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-xl uppercase mb-4">Page Editor - {page.slug}</h1>
      <div className="flex flex-col gap-8 text-sm">
        <EditorHeader tab={tab} setTab={setTab} />

        <div className="flex flex-col">
          {tab === "editor" ? (
            <div className="flex flex-col">
              <PageContentEditor
                enData={contentEn}
                frData={contentFr}
                path={[]}
                onChange={handleChange}
              />
              <button
                className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md mt-4"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 border px-4 rounded bg-black">
              <Home
                content={tab === "preview-en" ? contentEn : contentFr}
                event={{
                  name: "Event",
                  description: "Description",
                  startDateTime: new Date().toDateString(),
                  endDateTime: new Date().toDateString(),
                  location: "Location",
                  slug: "event-slug",
                  image: "event-image-url",
                  talks: [],
                  speakers: [],
                  sponsors: [],
                }}
                previousTalks={[]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageEditor;
