import { ItemTab } from "./types";

const EditorHeader = ({
  tab,
  setTab,
}: {
  tab: ItemTab;
  setTab: (t: ItemTab) => void;
}) => {
  return (
    <div className="flex gap-8 rounded">
      <p
        className={`border px-4 py-2 rounded hover:bg-gray-900 hover:cursor-pointer ${
          tab === "editor" && "bg-gray-900"
        }`}
        onClick={() => setTab("editor")}
      >
        Editor
      </p>
      <p
        className={`border px-4 py-2 rounded hover:bg-gray-900 hover:cursor-pointer ${
          tab === "preview-en" && "bg-gray-900"
        }`}
        onClick={() => setTab("preview-en")}
      >
        Preview 🇬🇧
      </p>
      <p
        className={`border px-4 py-2 rounded hover:bg-gray-900 hover:cursor-pointer ${
          tab === "preview-fr" && "bg-gray-900"
        }`}
        onClick={() => setTab("preview-fr")}
      >
        Preview 🇫🇷
      </p>
    </div>
  );
};

export default EditorHeader;
