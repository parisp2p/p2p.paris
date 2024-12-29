import { useState } from "react";
import ContentEditor from "../ContentEditor";

export type EventEditorContent = {
  slug: string;
  name_en: string;
  name_fr: string;
  image_id: string;
  subtitle_en: string;
  subtitle_fr: string;
  description_en: string;
  description_fr: string;
  start_date: Date;
  end_date: Date;
  location_slug: string;
  link: string;
  github_issue_url: string;
};

const defaultEvent: EventEditorContent = {
  slug: "new",
  name_en: "",
  name_fr: "",
  image_id: "",
  subtitle_en: "",
  subtitle_fr: "",
  description_en: "",
  description_fr: "",
  start_date: new Date(),
  end_date: new Date(),
  location_slug: "",
  link: "",
  github_issue_url: "",
};

const EventEditor = ({
  event = defaultEvent,
}: {
  event: EventEditorContent | undefined;
}) => {
  const [tab, setTab] = useState<"editor" | "preview-en" | "preview-fr">(
    "editor",
  );
  const [isNew, _] = useState<boolean>(event.slug === "new");
  const [saved, setSaved] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: EventEditorContent) => {
    try {
      if (isNew) {
        const res = await fetch(`/api/events`, {
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
        const res = await fetch(`/api/events/${event.slug}`, {
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
    <div className="flex flex-col">
      <h1 className="text-2xl mb-4">Event Editor - {event.slug}</h1>
      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          <p
            className={`border px-4 py-2 rounded hover:bg-gray-700 hover:cursor-pointer ${
              tab === "editor" && "bg-gray-700"
            }`}
            onClick={() => setTab("editor")}
          >
            Editor
          </p>
          <p
            className={`border px-4 py-2 rounded hover:bg-gray-700 hover:cursor-pointer ${
              tab === "preview-en" && "bg-gray-700"
            }`}
            onClick={() => setTab("preview-en")}
          >
            Preview 🇬🇧
          </p>
          <p
            className={`border px-4 py-2 rounded hover:bg-gray-700 hover:cursor-pointer ${
              tab === "preview-fr" && "bg-gray-700"
            }`}
            onClick={() => setTab("preview-fr")}
          >
            Preview 🇫🇷
          </p>
        </div>
        <div className="flex flex-col">
          {tab === "editor" ? (
            <div className="flex flex-col">
              {saved ? (
                <p className="text-green-500">Saved!</p>
              ) : (
                <div className="flex flex-col">
                  <ContentEditor
                    key={event.slug}
                    content={event}
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

export default EventEditor;
