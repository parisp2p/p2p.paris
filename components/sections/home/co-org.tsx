import { Button } from "@/components/ui/button";
import TextureSeparatorComponent from "@/components/ui/texture-separator";
import { HomePage } from "@/utils/pageTypes";
import Image from "next/image";

//TODO: remove and use from DB
const data = [
  {
    logo: "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    title: "Gno Land",
  },
  {
    logo: "https://www.starknet.io/wp-content/themes/Starknet/assets/img/starknet-logo.svg",
    title: "Starknet",
  },
  {
    logo: "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    title: "Gno Land",
  },
  {
    logo: "https://www.starknet.io/wp-content/themes/Starknet/assets/img/starknet-logo.svg",
    title: "Starknet",
  },
  {
    logo: "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    title: "Gno Land",
  },
  {
    logo: "https://www.starknet.io/wp-content/themes/Starknet/assets/img/starknet-logo.svg",
    title: "Starknet",
  },
  {
    logo: "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    title: "Gno Land",
  },
  {
    logo: "https://www.starknet.io/wp-content/themes/Starknet/assets/img/starknet-logo.svg",
    title: "Starknet",
  },
  {
    logo: "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    title: "Gno Land",
  },
  {
    logo: "https://www.starknet.io/wp-content/themes/Starknet/assets/img/starknet-logo.svg",
    title: "Starknet",
  },
  {
    logo: "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    title: "Gno Land",
  },
  {
    logo: "https://www.starknet.io/wp-content/themes/Starknet/assets/img/starknet-logo.svg",
    title: "Starknet",
  },
  {
    logo: "https://www.starknet.io/wp-content/themes/Starknet/assets/img/starknet-logo.svg",
    title: "Starknet",
  },
  {
    logo: "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    title: "Gno Land",
  },
  {
    logo: "https://www.starknet.io/wp-content/themes/Starknet/assets/img/starknet-logo.svg",
    title: "Starknet",
  },
  {
    logo: "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    title: "Gno Land",
  },
  {
    logo: "https://www.starknet.io/wp-content/themes/Starknet/assets/img/starknet-logo.svg",
    title: "Starknet",
  },
  {
    logo: "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    title: "Gno Land",
  },
  {
    logo: "https://www.starknet.io/wp-content/themes/Starknet/assets/img/starknet-logo.svg",
    title: "Starknet",
  },
  {
    logo: "https://www.starknet.io/wp-content/themes/Starknet/assets/img/starknet-logo.svg",
    title: "Starknet",
  },
  {
    logo: "https://gnolang.github.io/blog/2024-05-21_the-gnome/src/thumbs/banner.png",
    title: "Gno Land",
  },
  {
    logo: "https://www.starknet.io/wp-content/themes/Starknet/assets/img/starknet-logo.svg",
    title: "Starknet",
  },
];

export const HomeCoOrg = ({ content }: { content: HomePage }) => {
  return (
    <>
      <div className="w-full mt-20">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <Image
              src="/icons/co-org-heart.svg"
              alt="Icon"
              height={24}
              width={24}
            />
            <h3 className="uppercase text-lg font-semibold my-6 z-10">
              {content.coOrg.title}
            </h3>
          </div>
          <Button variant="outline" className="uppercase">
            {content.coOrg.buttonText}
          </Button>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-1  sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-0 border border-[#282828]">
            {data.map((item) => (
              <div
                key={item.title}
                className="h-[224px] w-full border border-[#282828] flex  justify-between items-center px-10"
              >
                <img
                  src={item.logo}
                  className="object-contain w-full h-full"
                  alt={item.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <TextureSeparatorComponent />
    </>
  );
};
