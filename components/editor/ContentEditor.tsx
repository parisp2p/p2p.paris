import { Location } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ImagePicker from "./ImagePicker";

const LocationPicker = ({
  onSelect,
}: {
  onSelect: (location: string) => void;
}) => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-white">Locations</h1>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="w-[180px] p-2 rounded-md hover:cursor-pointer"
      >
        <option value="" disabled selected>
          Select a location
        </option>
        {locations.map((location) => (
          <option key={location.slug} value={location.slug}>
            {location.name_en}
          </option>
        ))}
      </select>
    </div>
  );
};

const ContentEditor = ({
  content,
  onSubmit,
}: {
  content: any;
  onSubmit: (value: any) => void;
}) => {
  const [editedContent, setContent] = useState<any>(content);

  const getInputType = (key: string) => {
    if (key === "location_slug") {
      return "location";
    }
    if (key.includes("date")) {
      return "date";
    }
    if (key.includes("image")) {
      return "image";
    }
    return "text";
  };

  const handleChange = (key: string, value: string) => {
    setContent({
      ...editedContent,
      [key]: value,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(content).map(([key, value]) => (
        <div key={key} className="flex flex-col gap-2">
          <label className="text-white">{key}</label>
          {}
          {getInputType(key) === "date" && (
            <input
              type="date"
              value={value as string}
              onChange={(e) => handleChange(key, e.target.value)}
              className=" text-white rounded-md p-2"
            />
          )}
          {getInputType(key) === "image" ? (
            value?.length ? (
              <img
                src={`/api/images/${value}`}
                className="h-[300px] w-[300px]"
              />
            ) : (
              <ImagePicker onUpload={(e) => handleChange(key, e)} />
            )
          ) : (
            <></>
          )}
          {getInputType(key) === "location" && (
            <LocationPicker onSelect={(e) => handleChange(key, e)} />
          )}
          {getInputType(key) === "text" && (
            <textarea
              className="px-4 pt-2 rounded w-full border"
              defaultValue={value as string}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          )}
        </div>
      ))}
      <Button onClick={() => onSubmit(editedContent)}>Save</Button>
    </div>
  );
};

export default ContentEditor;
