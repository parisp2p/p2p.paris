import { Button } from "@/components/ui/button";
import { ClientEvent } from "@/types/client";
import { HomePage } from "@/utils/pageTypes";
import Image from "next/image";
import Link from "next/link";

export const HomeEventsSection = ({ content,event }: { content: HomePage, event: ClientEvent }) => {
  const containerStyles =
    "flex flex-col text-center items-center w-full mt-0 h-[508px] border border-input border-[#282828] p-4";

  return (
    <div className="flex flex-col lg:flex-row mt-[116px] w-full">
      <Link href={`/events/${event.slug}`} className={containerStyles}>
        <h2 className="text-base uppercase">
          {event.name}
        </h2>
        <Image
          src="/images/paris-p2p-logo.svg"
          width={200}
          height={200}
          alt="Paris P2P"
          className="my-6"
        />
        <p className="text-base uppercase max-w-[260px] mx-auto">
          {content.hero.nextMainEvent.subtitle}
        </p>
        <p className="text-[13px] uppercase text-gray-999 my-3">
          {content.hero.nextMainEvent.descriptionTitle}
        </p>
        {content.hero.nextMainEvent.descriptionItems.map((item) => (
          <p
            className="text-[13px] leading-[20px] tracking-[5%] text-center text-gray-999 m-0 p-0"
            key={item}
          >
            {item}
          </p>
        ))}
      </Link>
      <div className={containerStyles}>
        <h2 className="text-base uppercase">{content.hero.parisP2P.title}</h2>
        <img
          src="/images/paris-p2p-bg.png"
          alt="Paris P2P"
          className="w-full h-auto max-h-[508px] object-contain"
        />
      </div>

      <div className={`${containerStyles} flex flex-col justify-between`}>
        <div>
          <h2 className="text-base uppercase">
            {content.hero.hackathon.title}
          </h2>
          <h2 className="text-base uppercase text-gray-999">
            {content.hero.hackathon.subtitle}
          </h2>
        </div>
        <Image
          src="/images/hackathon.png"
          alt="Paris P2P"
          height={272}
          width={272}
        />
        <Link
          href="https://airtable.com/appVBIJFBUheVWS0Q/shrax6nA5OHpVGu2f"
          target="__blank"
        >
          <Button variant="outline">{content.hero.hackathon.btn.text}</Button>
        </Link>
      </div>
    </div>
  );
};
