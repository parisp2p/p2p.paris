import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

interface RecursiveContentEditorProps {
  enData: Record<string, any>;
  frData: Record<string, any>;
  path: string[];
  onChange: (path: string[], value: string, isEn: boolean) => void;
}

const PageContentEditor = ({
  enData,
  frData,
  path,
  onChange,
}: RecursiveContentEditorProps) => {
  return (
    <>
      {Object.keys(enData).map((key) => {
        const enVal = enData[key];
        const frVal = frData[key];

        // If the value is an object, recurse further
        if (typeof enVal === "object" && enVal !== null) {
          return (
            <div key={key} className="flex flex-col mb-6">
              <Collapsible defaultOpen={true}>
                <CollapsibleTrigger className="flex w-full hover:bg-gray-800 p-2 rounded justify-between">
                  <label className="block text-gray-500 uppercase text-sm mb-2 hover:cursor-pointer ">
                    {key}
                  </label>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mx-4 border-l pl-4">
                    <PageContentEditor
                      enData={enVal}
                      frData={frVal}
                      path={[...path, key]}
                      onChange={onChange}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          );
        }

        // Otherwise, treat it as a string field
        return (
          <div key={key} className="my-4">
            <label className="block text-gray-500 uppercase text-sm mb-2">
              {key}
            </label>
            <div className="flex gap-4">
              {/* English Field */}
              <div className="flex flex-col w-full">
                <p className="text-gray-700 lowercase text-sm mb-1">🇬🇧</p>
                <textarea
                  className="px-4 pt-2 rounded w-full border"
                  defaultValue={enVal}
                  onChange={(e) => {
                    onChange([...path, key], e.target.value, true);
                  }}
                />
              </div>

              {/* French Field */}
              <div className="flex flex-col w-full">
                <p className="text-gray-700 lowercase text-sm mb-1">🇫🇷</p>
                <textarea
                  className="px-4 pt-2 rounded w-full border"
                  defaultValue={frVal}
                  onChange={(e) => {
                    onChange([...path, key], e.target.value, false);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PageContentEditor;
