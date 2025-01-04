import { EditorFocusedItem } from "@/pages/editor";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
} from "../ui/sidebar";

import { useMemo } from "react";
import { PageEditorContent } from "./page";
import {
  EditorFocusedItemType,
  EventEditorContent,
  LocationEditorContent,
  OrganizationEditorContent,
  SpeakerEditorContent,
} from "./types";

type MenuCategory = {
  name: string;
  type: EditorFocusedItemType;
  items:
    | PageEditorContent[]
    | EventEditorContent[]
    | LocationEditorContent[]
    | SpeakerEditorContent[]
    | OrganizationEditorContent[]
    | { slug: "+ new" }[];
};

const EditorSideBar = ({
  pages,
  events,
  locations,
  speakers,
  organizations,
  onSelect,
}: {
  pages: PageEditorContent[];
  events: EventEditorContent[];
  locations: LocationEditorContent[];
  speakers: SpeakerEditorContent[];
  organizations: OrganizationEditorContent[];
  onSelect: (f: EditorFocusedItem) => undefined;
}) => {
  const categories: MenuCategory[] = useMemo(() => {
    const c: MenuCategory[] = [
      { name: "Pages", type: "page", items: pages },
      { name: "Events", type: "event", items: events },
      { name: "Locations", type: "location", items: locations },
      { name: "Speakers", type: "speaker", items: speakers },
      { name: "Organizations", type: "organization", items: organizations },
    ];

    return c.map((cat) => ({
      ...cat,
      items:
        cat.type === "page" ? cat.items : cat.items.concat([{ slug: "new" }]),
    }));
  }, []);

  return (
    <div className="w-80 h-full">
      <SidebarProvider>
        <SidebarMenu className="bg-[#18181B] p-5">
          {categories.map((category, i) => (
            <Collapsible
              key={`category-${i}`}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <span className="uppercase">{category.name}</span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {category.items.map((item) => (
                      <SidebarMenuSubItem key={item.slug}>
                        <SidebarMenuButton
                          onClick={() =>
                            onSelect({ type: category.type, slug: item.slug })
                          }
                        >
                          <span className="text-xs text-gray-400 uppercase">
                            {item.slug === "new" ? "+ new" : item.slug}
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarProvider>
    </div>
  );
};

export default EditorSideBar;
