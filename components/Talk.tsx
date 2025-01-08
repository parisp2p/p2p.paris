import { Tag, TagType } from "./ui/tag";
import { formatDate, formatTime } from "@/utils/dates";
import Image from "next/image";
import { ClientTalk } from "@/types/client";
import Link from "next/link";
import { $Enums } from "@prisma/client";

const TALK_TYPE_TAG_MAPPER: Record<$Enums.TalkType, TagType> = {
  HACKATHON: TagType.HACKATHON,
  MEET_UP: TagType.MEET_UP,
  PROJECTION: TagType.PROJECTION,
  STAND: TagType.STAND,
  TALK: TagType.TALK,
  WORKSHOP: TagType.WORKSHOP,
  PARTY: TagType.DJ_SET,
};

const formatNames = (names: string[]) => {
  if (!names.length) return "";

  if (names.length === 1) return names[0];

  const allExceptLast = names.slice(0, -1).join(", ");
  const last = names[names.length - 1];

  return `${allExceptLast} & ${last}`;
};

export const Talk = (props: ClientTalk & { isSingleView?: boolean }) => {
  const LINE_ITEMS = [
    {
      icon: "/icons/calendar-outline.svg",
      value: formatDate(props.startDateTime),
    },
    {
      icon: "/icons/clock-outline.svg",
      value: `${formatTime(props.startDateTime)} - ${formatTime(props.endDateTime)}`,
    },
    {
      icon: "/icons/globe-outline.svg",
      value: props.language || "N/A",
    },
    {
      icon: "/icons/map-marker-outline.svg",
      value: props.location || "N/A",
    },
    {
      icon: "/icons/speaker-outline.svg",
      value: props.speakers?.length
        ? formatNames(props.speakers.map((speaker) => speaker))
        : "N/A",
    },
  ];

  return (
    <Link href={`/talks/${props.slug}`}>
      <div className="border border-[#282828] p-4 cursor-pointer">
        <div>
          <div>
            <Tag type={TALK_TYPE_TAG_MAPPER[props.type]} className="mb-4" />
            {LINE_ITEMS.map((item) => (
              <div key={item.icon} className="flex gap-2 mb-3 items-center">
                <Image src={item.icon} alt="Icon" height={20} width={20} />
                <p className="uppercase text-[13px] text-gray-999 leading-5 tracking-[5%]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          {!!props.imageURL && (
            <img
              className="w-full h-[290px]"
              src={props.imageURL}
              alt={`${props.title} Banner`}
            />
          )}
        </div>
        <div className="h-[192px]">
          <h2 className="text-lg font-semibold text-primary">{props.title}</h2>
          <p
            className={`text-[13px] overflow-hidden ${props.isSingleView ? "" : "text-ellipsis line-clamp-5"}`}
            dangerouslySetInnerHTML={{
              __html: props.description,
            }}
          />
        </div>
      </div>
    </Link>
  );
};
