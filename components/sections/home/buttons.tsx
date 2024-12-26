import { Button } from "@/components/ui/button";
import { HomePage } from "@/utils/pageTypes";

export const HomeButtonsSection = ({ content }: { content: HomePage }) => {
  const buttons = [
    { title: content.buttons.getTicket.title },
    { title: content.buttons.joinHackathon.title },
  ];

  return (
    <div className="w-full my-10 flex flex-col items-center sm:flex-row gap-6 sm:justify-center">
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant="outline"
          className="w-full sm:w-auto max-w-[212px] justify-between uppercase"
        >
          {button.title} <span>&gt;</span>
        </Button>
      ))}
    </div>
  );
};
