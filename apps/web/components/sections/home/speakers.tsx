import { Speaker } from "@/components/Speaker";
import { ClientSpeaker } from "@/types/client";
import { Button } from "@repo/ui/button";

import { HomePage } from "@/utils/pageTypes";
import Image from "next/image";
import Link from "next/link";

export const HomeSpeakers = ({
  content,
  speakers,
}: {
  content: HomePage;
  speakers: ClientSpeaker[];
}) => {
  return (
    <div className="w-full mt-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Image src="/icons/mic.svg" alt="Icon" height={24} width={24} />
          <h3 className="uppercase text-lg font-semibold my-6 z-10">
            {content.speakers.title}
          </h3>
        </div>
        <Link
          href="https://airtable.com/appVBIJFBUheVWS0Q/shrQl65lAr3zl5pkW"
          target="__blank"
        >
          <Button variant="outline" className="uppercase">
            {content.speakers.buttonText}
          </Button>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border border-[#282828]">
          {speakers.map((item) => (
            <Speaker key={item.slug} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};
