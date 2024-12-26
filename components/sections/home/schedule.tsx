import { EventItem } from "@/components/EventItem";
import { BadgeType } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { TagType } from "@/components/ui/tag";
import TextureSeparatorComponent from "@/components/ui/texture-separator";
import { HomePage } from "@/utils/pageTypes";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const tabData = [
  {
    title: "Day 1",
    desc: "Wed, 4 April",
  },
  {
    title: "Day 2",
    desc: "Thu, 5 April",
  },
  {
    title: "Day 3",
    desc: "Fri, 6 April",
  },
  {
    title: "Day 4",
    desc: "Sat, 7 April",
  },
  {
    title: "Day 5",
    desc: "Sun, 8 April",
  },
  {
    title: "Day 6",
    desc: "Mon, 9 April",
  },
];

const EVENTS = [
  {
    id: 1,
    date: "April 27, 2022",
    startTime: "18h30",
    endTime: "18h45",
    lang: "EN",
    location: "Ground control",
    speakers: "Loïc Titren & Manfred Touron",
    type: TagType.DJ_SET,
    title: "One Arm Crypto Bandit Machine",
    desc: "One Arm Crypto Bandit Machine, One Arm Crypto Bandit Machine",
    badges: ["Cryptocurrencies", "Art"],
  },
  {
    id: 1,
    date: "April 27, 2022",
    startTime: "18h30",
    endTime: "18h45",
    lang: "EN",
    location: "Ground control",
    speakers: "Loïc Titren & Manfred Touron",
    type: TagType.DJ_SET,
    title: "One Arm Crypto Bandit Machine",
    desc: "One Arm Crypto Bandit Machine, One Arm Crypto Bandit Machine",
    badges: ["Cryptocurrencies", "Art"],
  },
];

export const HomeSchedule = ({ content }: { content: HomePage }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabContainerRef.current) {
      const activeTab = tabContainerRef.current.children[
        activeTabIndex
      ] as HTMLElement;
      if (activeTab) {
        const containerWidth = tabContainerRef.current.offsetWidth;
        const tabWidth = activeTab.offsetWidth;
        const scrollPosition =
          activeTab.offsetLeft - (containerWidth - tabWidth) / 2;
        tabContainerRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [activeTabIndex]);

  return (
    <>
      <div className="w-full mt-20">
        <div className="flex gap-3">
          <Image src="/icons/calendar.svg" alt="Icon" height={24} width={24} />
          <h3 className="uppercase text-lg font-semibold my-6 z-10">
            {content.schedule.title}
          </h3>
        </div>

        <div ref={tabContainerRef} className="flex gap-3 overflow-x-auto">
          {tabData.map((tab, index) => (
            <div
              key={tab.title}
              className={`h-[76px] border border-[#282828] flex  flex-none flex-col justify-between p-5 cursor-pointer ${
                activeTabIndex === index ? "border-white" : ""
              }`}
              onClick={() => setActiveTabIndex(index)}
            >
              <p className="uppercase text-[13px] leading-4 tracking-[5%] m-0 p-0">
                {tab.title}
              </p>
              <p
                className={`uppercase text-[13px] text-gray-999 leading-4 tracking-[5%] m-0 p-0 ${
                  activeTabIndex === index ? "text-white" : ""
                }`}
              >
                {tab.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Image src="/icons/filters.svg" alt="Icon" height={24} width={24} />
            <h3 className="uppercase text-lg font-semibold my-6 z-10">
              {content.schedule.filterTitle}
            </h3>
          </div>
          <div className="flex gap-6">
            <Dropdown
              Button={({ onClick, isOpen }) => (
                <Button
                  variant="outline"
                  className="uppercase gap-2 px-5"
                  onClick={onClick}
                >
                  {content.schedule.kind}
                  <Image
                    src="/icons/triangle-down.svg"
                    alt="Icon"
                    height={16}
                    width={16}
                    className={`transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </Button>
              )}
              DropDownComponent={() => (
                <div className="h-48 w-[100px] border border-[#282828]">a</div>
              )}
            />
            <Dropdown
              Button={({ onClick, isOpen }) => (
                <Button
                  variant="outline"
                  className="uppercase gap-2 px-5"
                  onClick={onClick}
                >
                  {content.schedule.location}
                  <Image
                    src="/icons/triangle-down.svg"
                    alt="Icon"
                    height={16}
                    width={16}
                    className={`transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </Button>
              )}
              DropDownComponent={() => <div></div>}
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        {EVENTS.map((event, index) => (
          <EventItem
            key={event.id}
            {...event}
            badgeType={index % 2 === 0 ? BadgeType.GREEN : BadgeType.YELLOW}
          />
        ))}
      </div>

      <TextureSeparatorComponent />
    </>
  );
};
