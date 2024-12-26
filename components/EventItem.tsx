import Image from "next/image";
import { Tag, TagType } from "./ui/tag";
import React from "react";
import { Badge, BadgeType } from "./ui/badge";

interface EventItemProps {
  date: string;
  startTime: string;
  endTime: string;
  lang: string;
  location: string;
  speakers: string;
  type: TagType;
  title: string;
  desc: string;
  badges: string[];
  badgeType: BadgeType;
}

export const EventItem = (props: EventItemProps) => {
  const LINE_ITEMS = [
    {
      icon: "/icons/calendar-outline.svg",
      value: props.date,
    },
    {
      icon: "/icons/clock-outline.svg",
      value: `${props.startTime} - ${props.endTime}`,
    },
    {
      icon: "/icons/globe-outline.svg",
      value: props.lang,
    },
    {
      icon: "/icons/map-marker-outline.svg",
      value: props.location,
    },
    {
      icon: "/icons/speaker-outline.svg",
      value: props.speakers,
    },
  ];

  return (
    <div className="w-full border border-[#282828] p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-between">
          {LINE_ITEMS.map((item, index) => (
            <React.Fragment key={item.icon}>
              <div className="flex gap-2">
                <Image src={item.icon} alt="Icon" height={20} width={20} />
                <p className="uppercase text-[13px] text-gray-999 leading-[20px] tracking-[5%]">
                  {item.value}
                </p>
              </div>
              {index !== LINE_ITEMS.length - 1 && (
                <div className="mx-5 w-[1px] h-4 bg-white opacity-20"></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <Tag type={props.type} />
      </div>
      <p className="text-lg mt-6 mb-1">{props.title}</p>
      <p className="text-[13px] text-gray-999 leading-[16px]">{props.desc}</p>
      <div className="flex flex-row gap-1 mt-6">
        {props.badges.map((badge) => (
          <Badge key={badge} title={badge} type={props.badgeType} />
        ))}
      </div>
    </div>
  );
};
