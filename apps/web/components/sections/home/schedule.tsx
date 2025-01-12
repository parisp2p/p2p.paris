import { EventItem } from "@/components/EventItem";
import { ClientTalk, GroupedTalks } from "@/types/client";
import { formatDate } from "@/utils/dates";
import { HomePage } from "@/utils/pageTypes";
import TextureSeparatorComponent, {
  BadgeType,
  Button,
  Dropdown,
} from "@repo/ui";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const HomeSchedule = ({
  content,
  groupedTalks,
}: {
  content: HomePage;
  talks: ClientTalk[];
  groupedTalks: GroupedTalks[];
}) => {
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
          {groupedTalks.map((tab, index) => (
            <div
              key={tab.day}
              className={`h-[76px] border border-[#282828] flex  flex-none flex-col justify-between p-5 cursor-pointer ${
                activeTabIndex === index ? "border-white" : ""
              }`}
              onClick={() => setActiveTabIndex(index)}
            >
              <p className="uppercase text-[13px] leading-4 tracking-[5%] m-0 p-0">
                {tab.day + 1}
              </p>
              <p
                className={`uppercase text-[13px] text-gray-999 leading-4 tracking-[5%] m-0 p-0 ${
                  activeTabIndex === index ? "text-white" : ""
                }`}
              >
                {formatDate(tab.date)}
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
      <div className="w-full flex flex-col gap-3">
        <TextureSeparatorComponent className="flex items-center justify-center">
          <p className="text-lg uppercase">Day {activeTabIndex + 1}</p>
        </TextureSeparatorComponent>
        {groupedTalks[activeTabIndex].talks.map((talk, index) => (
          <EventItem
            key={talk.slug}
            {...talk}
            badgeType={index % 2 === 0 ? BadgeType.GREEN : BadgeType.YELLOW}
          />
        ))}
      </div>
    </>
  );
};
