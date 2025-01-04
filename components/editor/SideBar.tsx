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
import { EventEditorContent } from "./event";
import { LocationEditorContent } from "./location";
import { PageEditorContent } from "./page";

const EditorSideBar = ({
  pages,
  events,
  locations,
  onSelect,
}: {
  pages: PageEditorContent[];
  events: EventEditorContent[];
  locations: LocationEditorContent[];
  onSelect: (f: EditorFocusedItem) => undefined;
}) => (
  <div className="w-80 h-full">
    <SidebarProvider>
      <SidebarMenu className="bg-[#18181B] p-5">
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <span>Pages</span>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {pages.map((page) => (
                  <SidebarMenuSubItem key={page.slug}>
                    <SidebarMenuButton
                      onClick={() =>
                        onSelect({ type: "page", slug: page.slug })
                      }
                    >
                      <span>{page.slug}</span>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <span>Events</span>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {events.map((event) => (
                  <SidebarMenuSubItem key={event.slug}>
                    <SidebarMenuButton
                      onClick={() =>
                        onSelect({ type: "event", slug: event.slug })
                      }
                    >
                      <span>{event.slug}</span>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                ))}
                <SidebarMenuSubItem key="new-event">
                  <SidebarMenuButton
                    onClick={() => onSelect({ type: "event", slug: "new" })}
                  >
                    <span>+ New Event</span>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <span>Locations</span>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {locations.map((location) => (
                  <SidebarMenuSubItem key={location.slug}>
                    <SidebarMenuButton
                      onClick={() =>
                        onSelect({ type: "location", slug: location.slug })
                      }
                    >
                      <span>{location.slug}</span>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                ))}
                <SidebarMenuSubItem key="new-event">
                  <SidebarMenuButton
                    onClick={() => onSelect({ type: "event", slug: "new" })}
                  >
                    <span>+ New Event</span>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarProvider>
  </div>
);

export default EditorSideBar;
