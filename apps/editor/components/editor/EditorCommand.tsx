import { EditorFocusedItem } from '@/pages/editor';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/ui';
import { useEffect, useState } from 'react';
import { PageEditorContent } from './page';
import {
  EditorFocusedItemType,
  EventEditorContent,
  LocationEditorContent,
  OrganizationEditorContent,
  SpeakerEditorContent,
  TalkEditorContent,
} from './types';

const CommandItemGroup = ({
  name,
  items,
  type,
  onSelect,
}: {
  name: string;
  items: { name_en?: string; slug: string }[];
  type: EditorFocusedItemType;
  onSelect: (x: EditorFocusedItem) => void;
}) => (
  <CommandGroup heading={name.toUpperCase()}>
    {items.map((item, i) => (
      <div
        className=""
        onClick={() => onSelect({ type, slug: item.slug })}
        key={`command-item-${name.toLowerCase()}-${i}`}
      >
        <CommandItem className="hover:cursor-pointer">
          {item.name_en || item.slug}
        </CommandItem>
      </div>
    ))}
  </CommandGroup>
);

export function EditorCommandMenu({
  setFocus,
  pages,
  events,
  locations,
  speakers,
  organizations,
  talks,
}: {
  setFocus: (x: EditorFocusedItem) => void;
  pages: PageEditorContent[];
  events: EventEditorContent[];
  locations: LocationEditorContent[];
  speakers: SpeakerEditorContent[];
  organizations: OrganizationEditorContent[];
  talks: TalkEditorContent[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (x: EditorFocusedItem) => {
    setOpen(false);
    setFocus(x);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search item..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandItemGroup
          name="Pages"
          type="page"
          items={pages}
          onSelect={handleSelect}
        />
        <CommandItemGroup
          name="Events"
          type="event"
          items={events}
          onSelect={handleSelect}
        />
        <CommandItemGroup
          name="Locations"
          type="location"
          items={locations}
          onSelect={handleSelect}
        />
        <CommandItemGroup
          name="Speakers"
          type="speaker"
          items={speakers}
          onSelect={handleSelect}
        />
        <CommandItemGroup
          name="Organizations"
          type="organization"
          items={organizations}
          onSelect={handleSelect}
        />
        <CommandItemGroup
          name="Talks"
          type="talk"
          items={talks}
          onSelect={handleSelect}
        />
      </CommandList>
    </CommandDialog>
  );
}
