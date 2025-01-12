import { Button } from "@/components/ui/button";
import TextureSeparatorComponent from "@/components/ui/texture-separator";
import { ClientTalk } from "@/types/client";
import { HomePage } from "@/utils/pageTypes";
import Link from "next/link";

export const PreviousConferences = ({
  content,
  talks,
}: {
  content: HomePage;
  talks: ClientTalk[];
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h3 className="uppercase text-lg font-semibold my-6 z-10">
          {content.previousTalks.title}_
        </h3>
        <Link href="/talks">
          <Button variant="outline" className="uppercase">
            {content.previousTalks.buttonTitle}
          </Button>
        </Link>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#282828]">
          {talks.map((item) => (
            <Link
              href={`/talks/${item.slug}`}
              key={item.slug}
              className="min-h-[200px] border border-[#282828] flex flex-col justify-between p-2 relative"
            >
              <img
                src={`/api/images/${item.image}`}
                alt={`${item.title} banner`}
                className="w-full object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
      <TextureSeparatorComponent />
    </div>
  );
};
