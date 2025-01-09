import { Button } from "@/components/ui/button";
import TextureSeparatorComponent from "@/components/ui/texture-separator";
import { ClientOrganization } from "@/types/client";
import { HomePage } from "@/utils/pageTypes";
import Image from "next/image";

export const HomeCoOrg = ({
  content,
  sponsors,
}: {
  content: HomePage;
  sponsors: ClientOrganization[];
}) => {
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
            {sponsors.map((item) => (
              <div
                key={item.name}
                className="h-[224px] w-full border border-[#282828] flex  justify-between items-center px-10"
              >
                <img
                  src={`/api/images/${item.image}`}
                  className="object-contain w-full h-full"
                  alt={`Sponsor ${item.name} image`}
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
