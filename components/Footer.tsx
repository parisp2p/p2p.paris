import { HomePage } from "@/utils/pageTypes";
import { Button } from "./ui/button";
import Image from "next/image";
import { Logo } from "./ui/logo";

export const Footer = ({ content }: { content: HomePage }) => {
  const SOCIAL_CONFIG = [
    {
      icon: "/icons/twitter-white.svg",
      title: "X (Twitter)",
    },
    {
      icon: "/icons/discord-white.svg",
      title: "Discord",
    },
    {
      icon: "/icons/medium-white.svg",
      title: "Medium",
    },
    {
      icon: "/icons/email-white.svg",
      title: "bootstrap@p2p.paris",
    },
  ];
  return (
    <footer className="w-full flex mt-20 mb-12 flex-col lg:flex-row">
      <div className="border border-[#282828] flex-1">
        <div className="p-3 border border-[#282828] flex items-center justify-between">
          <p className="text-lg uppercase font-semibold">
            {content.footer.buy.title}
          </p>
          <Button variant="outline">{content.footer.buy.buttonText}</Button>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/images/t-shirt.png"
            width={400}
            height={450}
            alt="T shirt"
          />
        </div>
      </div>
      <div className="border border-[#282828] flex-1">
        <div className="p-3 border border-[#282828] flex items-center justify-between">
          <Logo />
          <p className="uppercase text-gray-999 leading-4 text-[13px]">
            Paris p2p ©️ 2025
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {SOCIAL_CONFIG.map((item) => (
            <div
              key={item.title}
              className="h-[236px] border border-[#282828] p-3"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={item.icon}
                  height={24}
                  width={24}
                  alt={`${item.title} Icon`}
                />
                <p className="text-[13px] leading-4">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
