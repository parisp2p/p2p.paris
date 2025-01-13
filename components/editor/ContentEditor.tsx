import { Event, Location } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ImagePicker from "./ImagePicker";

const LocationPicker = ({
  onSelect,
  initialValueId,
}: {
  onSelect: (event: string) => void;
  initialValueId: string;
}) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [defaultValue, setDefaultValue] = useState<Location | null>(null);

  useEffect(() => {
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => {
        if (initialValueId.length > 0) {
          setDefaultValue(data.find((x: Event) => x.slug === initialValueId));
        }
        setLocations(data);
      });
  }, [initialValueId]);

  return (
    <div className="flex flex-col gap-4">
      {locations.length > 0 && (
        <select
          onChange={(e) => onSelect(e.target.value)}
          className="w-[400px] p-2 rounded-md hover:cursor-pointer"
        >
          <option
            defaultValue={defaultValue?.name_en || locations[0].name_en}
            disabled
            selected
          >
            {defaultValue?.name_en || locations[0].name_en}
          </option>
          {locations.map((location) => (
            <option key={location.slug} value={location.slug}>
              {location.name_en}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

const EventPicker = ({
  onSelect,
  initialValueId,
}: {
  onSelect: (event: string) => void;
  initialValueId: string;
}) => {
  console.log(initialValueId);
  const [events, setEvents] = useState<Event[]>([]);
  const [defaultValue, setDefaultValue] = useState<Event | null>(null);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setDefaultValue(data.find((x: Event) => x.slug === initialValueId));
        setEvents(data);
      });
  }, [initialValueId]);

  return (
    <div className="flex flex-col gap-4">
      {defaultValue && (
        <select
          onChange={(e) => onSelect(e.target.value)}
          className="w-[400px] p-2 rounded-md hover:cursor-pointer"
        >
          <option defaultValue={defaultValue.name_en} disabled selected>
            {defaultValue.name_en}
          </option>
          {events.map((event) => (
            <option key={event.slug} value={event.slug}>
              {event.name_en}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

const ContentEditor = ({
  content,
  onSubmit,
}: {
  // @ts-ignore
  content: any;
  // @ts-ignore
  onSubmit: (value: any) => void;
}) => {
  const [editedContent, setContent] = useState<{
    [key: string]: string;
  }>(content);

  const getInputType = (key: string) => {
    if (key === "event_id") {
      return "event";
    }
    if (key === "location_id") {
      return "location";
    }
    if (key.includes("_date")) {
      return "date";
    }
    if (key.includes("image")) {
      return "image";
    }
    if (key === "slug" && content[key] !== "new") {
      return "slug";
    }
    return "text";
  };

  const handleChange = (key: string, value: string) => {
    setContent({
      ...editedContent,
      [key]: value,
    });
  };

  const handleSave = () => {
    Object.entries(editedContent).forEach(([key, value]) => {
      if (getInputType(key) === "date") {
        editedContent[key] = new Date(value as string).toISOString();
      }
    });
    onSubmit(editedContent);
  };

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(editedContent).map(([key, value]) => (
        <div key={key} className="flex flex-col gap-2">
          <label className="text-white uppercase">
            {key.replace("_id", "")}
          </label>

          {getInputType(key) === "date" && (
            <input
              type="datetime-local"
              value={value?.length > 0 ? value.slice(0, 16) : ""} // Use the value as it is for local time
              onChange={(e) => handleChange(key, e.target.value)} // Keep the value as local time
              className="text-white rounded-md p-2"
            />
          )}
          {getInputType(key) === "image" ? (
            value?.length ? (
              <img src={`/api/images/${value}`} className="max-w-80" />
            ) : (
              <ImagePicker onUpload={(e) => handleChange(key, e)} />
            )
          ) : (
            <></>
          )}
          {getInputType(key) === "location" && (
            <LocationPicker
              onSelect={(e) => handleChange(key, e)}
              initialValueId={value as string}
            />
          )}
          {getInputType(key) === "text" && (
            <textarea
              className="px-4 pt-2 rounded w-full border"
              defaultValue={value as string}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          )}
          {getInputType(key) === "slug" && (
            <p className="pt-2 ">{value as string}</p>
          )}
          {getInputType(key) === "event" && (
            <EventPicker
              onSelect={(e) => handleChange(key, e)}
              initialValueId={value as string}
            />
          )}
        </div>
      ))}
      <Button onClick={() => handleSave()}>Save</Button>
    </div>
  );
};

export default ContentEditor;
