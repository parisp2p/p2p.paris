import { HomePage } from "@/utils/pageTypes";
import { Button } from "@repo/ui/button";
import Link from "next/link";

export const HomeButtonsSection = ({ content }: { content: HomePage }) => {
  const buttons = [
    {
      title: content.buttons.getTicket.title,
      href: "https://www.meetup.com/France-P2P/events/",
    },
    {
      title: content.buttons.joinHackathon.title,
      href: "https://airtable.com/appVBIJFBUheVWS0Q/shrax6nA5OHpVGu2f",
    },
  ];

  return (
    <div className="w-full my-10 flex flex-col items-center sm:flex-row gap-6 sm:justify-center">
      {buttons.map((button, index) => (
        <Link href={button.href} key={index} target="__blank">
          <Button
            variant="outline"
            className="w-[212px] justify-between uppercase text-[13px]"
          >
            {button.title} <span>&gt;</span>
          </Button>
        </Link>
      ))}
    </div>
  );
};
