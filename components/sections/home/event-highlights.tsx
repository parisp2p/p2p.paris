import TextureSeparatorComponent from "@/components/ui/texture-separator";
import { HomePage } from "@/utils/pageTypes";

export const HomeEventsHighlights = ({}: { content: HomePage }) => {
  //TODO: later use from content/ or from db
  const data = [
    {
      title: "5 days",
      description: ["April 4th to 11th, 2025"],
    },
    {
      title: "42 events",
      description: [
        "/conferences",
        "/workshops",
        "/hackathon",
        "/free co-working",
      ],
    },
    {
      title: "53 speakers",
      description: ["From everywhere to talk about the internet of tomorrow"],
    },
    {
      title: "1 location",
      description: ["Ground Control, at the center of Paris (gare de Lyon)"],
    },
  ];

  return (
    <div className="w-full">
      <h3 className="uppercase text-lg font-semibold my-6">Title</h3>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border border-[#282828]">
          {data.map((item) => (
            <div
              key={item.title}
              className="min-h-[200px] border border-[#282828] flex flex-col justify-between p-4"
            >
              <h3 className="uppercase text-lg font-semibold">{item.title}</h3>
              <div>
                {item.description.map((desc) => (
                  <p
                    key={desc}
                    className="uppercase text-[13px] text-gray-999 leading-[20px] tracking-[5%]  m-0 p-0"
                  >
                    {desc}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <TextureSeparatorComponent />
    </div>
  );
};
