import { useState } from "react";
import ContentEditor from "../ContentEditor";
import { EventEditorContent } from "../event";

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

const defaultLocation: LocationEditorContent = {
  slug: "new",
  name_en: "",
  name_fr: "",
  image_id: "",
  description_en: "",
  description_fr: "",
  address: "",
  events: [],
};

const LocationEditor = ({
  location = defaultLocation,
}: {
  location: LocationEditorContent | undefined;
}) => {
  const [tab, setTab] = useState<"editor" | "preview-en" | "preview-fr">(
    "editor",
  );
  const [isNew, _] = useState<boolean>(location.slug === "new");
  const [saved, setSaved] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: LocationEditorContent) => {
    try {
      if (isNew) {
        const res = await fetch(`/api/locations`, {
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
        const res = await fetch(`/api/locations/${location.slug}`, {
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
      <h1 className="text-2xl mb-4">Location Editor - {location.slug}</h1>
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
                    key={location.slug}
                    content={location}
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

export default LocationEditor;
