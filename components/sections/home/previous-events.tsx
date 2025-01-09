import TextureSeparatorComponent from "@/components/ui/texture-separator";
import { ClientEvent } from "@/types/client";
import { HomePage } from "@/utils/pageTypes";
import Link from "next/link";

export const PreviousEvents = ({
  content,
  events,
}: {
  content: HomePage;
  events: ClientEvent[];
}) => {
  return (
    <div className="w-full">
      <h3 className="uppercase text-lg font-semibold my-6 z-10">
        {content.previousEvents.title}_
      </h3>

      <div className="flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#282828]">
          {events.map((item) => (
            <Link
              href={`/events/${item.slug}`}
              key={item.slug}
              className="min-h-[200px] border border-[#282828] flex flex-col justify-between p-2 relative"
            >
              <img
                src={`/api/images/${item.image}`}
                alt={`${item.name} banner`}
                className="w-full object-contain"
              />
              <div className="flex gap-2 absolute bottom-3 left-4">
                <h3 className="uppercase font-semibold underline">
                  {item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <TextureSeparatorComponent />
    </div>
  );
};
