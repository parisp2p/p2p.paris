import { Button } from "@/components/ui/button";
import TextureSeparatorComponent from "@/components/ui/texture-separator";
import { HomePage } from "@/utils/pageTypes";
import Image from "next/image";

//TODO: remove and use from DB
const data = [
  {
    id: 1,
    avatar:
      "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    fullname: "Gno Land",
    position: "CEO",
    company: "P2P",
    social: {
      twitter: "https://x.com/ParisP2P",
      discord: "https://discord.com/invite/e4UZM4q",
    },
  },
  {
    id: 2,
    avatar:
      "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    fullname: "Gno Land",
    position: "CEO",
    company: "P2P",
    social: {
      twitter: "https://x.com/ParisP2P",
      discord: "https://discord.com/invite/e4UZM4q",
    },
  },
  {
    id: 3,
    avatar:
      "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    fullname: "Gno Land",
    position: "CEO",
    company: "P2P",
    social: {
      twitter: "https://x.com/ParisP2P",
      discord: "https://discord.com/invite/e4UZM4q",
    },
  },
  {
    id: 4,
    avatar:
      "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    fullname: "Gno Land",
    position: "CEO",
    company: "P2P",
    social: {
      twitter: "https://x.com/ParisP2P",
      discord: "https://discord.com/invite/e4UZM4q",
    },
  },
  {
    id: 5,
    avatar:
      "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    fullname: "Gno Land",
    position: "CEO",
    company: "P2P",
    social: {
      twitter: "https://x.com/ParisP2P",
      discord: "https://discord.com/invite/e4UZM4q",
    },
  },
  {
    id: 6,
    avatar:
      "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    fullname: "Gno Land",
    position: "CEO",
    company: "P2P",
    social: {
      twitter: "https://x.com/ParisP2P",
      discord: "https://discord.com/invite/e4UZM4q",
    },
  },
  {
    id: 7,
    avatar:
      "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    fullname: "Gno Land",
    position: "CEO",
    company: "P2P",
    social: {
      twitter: "https://x.com/ParisP2P",
      discord: "https://discord.com/invite/e4UZM4q",
    },
  },
  {
    id: 8,
    avatar:
      "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    fullname: "Gno Land",
    position: "CEO",
    company: "P2P",
    social: {
      twitter: "https://x.com/ParisP2P",
      discord: "https://discord.com/invite/e4UZM4q",
    },
  },
  {
    id: 9,
    avatar:
      "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    fullname: "Gno Land",
    position: "CEO",
    company: "P2P",
    social: {
      twitter: "https://x.com/ParisP2P",
      discord: "https://discord.com/invite/e4UZM4q",
    },
  },
  {
    id: 10,
    avatar:
      "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    fullname: "Gno Land",
    position: "CEO",
    company: "P2P",
    social: {
      twitter: "https://x.com/ParisP2P",
      discord: "https://discord.com/invite/e4UZM4q",
    },
  },
];

export const HomeSpeakers = ({ content }: { content: HomePage }) => {
  return (
    <div className="w-full mt-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Image src="/icons/mic.svg" alt="Icon" height={24} width={24} />
          <h3 className="uppercase text-lg font-semibold my-6 z-10">
            {content.speakers.title}
          </h3>
        </div>
        <Button variant="outline" className="uppercase">
          {content.speakers.buttonText}
        </Button>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border border-[#282828]">
          {data.map((item) => (
            <div
              key={item.id}
              className="h-[412px] w-full border border-[#282828] flex flex-col"
            >
              <div className="m-2 h-[320px] overflow-hidden bg-[#282828]">
                <img
                  src={item.avatar}
                  className="object-contain w-full h-full"
                  alt={item.fullname}
                />
              </div>
              <div className="border-t border-[#282828] flex justify-between items-end p-5">
                <div>
                  <p className="text-[13px] leading-4 tracking-[5%]">
                    {item.fullname}
                  </p>
                  <p className="text-[13px] leading-4 tracking-[5%] text-gray-999 mt-1">
                    {item.position}, {item.company}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3">
                  {!!item.social.twitter && (
                    <a
                      href={item.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80"
                    >
                      <Image
                        src="/icons/twitter.svg"
                        alt="Twitter logo"
                        width={24}
                        height={24}
                      />
                    </a>
                  )}
                  {!!item.social.discord && (
                    <a
                      href={item.social.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80"
                    >
                      <Image
                        src="/icons/discord.svg"
                        alt="Discord logo"
                        width={24}
                        height={24}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
