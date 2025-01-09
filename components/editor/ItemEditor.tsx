import { useState } from "react";
import ContentEditor from "./ContentEditor";
import EditorHeader from "./EditorHeader";
import {
  EventEditorContent,
  ItemTab,
  LocationEditorContent,
  OrganizationEditorContent,
  SpeakerEditorContent,
  TalkEditorContent,
} from "./types";

const ItemEditor = ({
  item,
  route,
}: {
  item:
    | LocationEditorContent
    | EventEditorContent
    | SpeakerEditorContent
    | TalkEditorContent
    | OrganizationEditorContent
    | undefined;
  route: string;
}) => {
  const [tab, setTab] = useState<ItemTab>("editor");
  const [saved, setSaved] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: LocationEditorContent) => {
    try {
      if (!item) {
        const res = await fetch(`/api/${route}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...e,
          }),
        });
        if (!res.ok) {
          throw new Error(`Error: ${(await res.json()).message}`);
        }
      } else {
        const res = await fetch(`/api/${route}/${item.slug}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...e,
          }),
        });
        if (!res.ok) {
          throw new Error(`Error: ${(await res.json()).message}`);
        }
      }
    } catch (e) {
      setError(e.message);
      return;
    }

    setSaved(true);
  };

  return (
    <div className="flex flex-col text-sm">
      <h1 className="text-xl mb-4 uppercase">Editor - {item?.slug ?? "new"}</h1>
      <div className="flex flex-col gap-12">
        <EditorHeader tab={tab} setTab={setTab} />
        <div className="flex flex-col">
          {tab === "editor" ? (
            <div className="flex flex-col">
              {saved ? (
                <p className="text-green-500">Saved!</p>
              ) : (
                <div className="flex flex-col">
                  <ContentEditor
                    key={item?.slug ?? "new"}
                    content={item}
                    onSubmit={handleSave}
                  />
                  {error && <div className="text-red-500">{error}</div>}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4 border px-4 rounded bg-black">
              <p>TODO</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemEditor;
