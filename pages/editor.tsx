import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { PrismaClient } from '@prisma/client';
import { useState } from 'react';
import Home from '.';

const SideBar = ({
  pages,
  onSelect,
}: {
  pages: Page[];
  onSelect: (f: FocusedItem) => undefined;
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
                        onSelect({ type: 'page', slug: page.slug })
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
                {pages.map((page) => (
                  <SidebarMenuSubItem key={page.slug}>
                    <SidebarMenuButton
                      onClick={() =>
                        onSelect({ type: 'page', slug: page.slug })
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
      </SidebarMenu>
    </SidebarProvider>
  </div>
);

interface Page {
  slug: string;
  content_en: Record<string, any>;
  content_fr: Record<string, any>;
}

interface RecursiveContentEditorProps {
  enData: Record<string, any>;
  frData: Record<string, any>;
  path: string[];
  onChange: (path: string[], value: string, isEn: boolean) => void;
}

/**
 * A small recursive component that traverses objects/strings
 * and renders nested text areas for English and French data.
 */
function RecursiveContentEditor({
  enData,
  frData,
  path,
  onChange,
}: RecursiveContentEditorProps) {
  return (
    <>
      {Object.keys(enData).map((key) => {
        const enVal = enData[key];
        const frVal = frData[key];

        // If the value is an object, recurse further
        if (typeof enVal === 'object' && enVal !== null) {
          return (
            <div key={key} className="mb-6">
              <label className="block text-gray-500 uppercase text-sm mb-2">
                {key}
              </label>
              <div className="ml-4 border-l pl-4">
                <RecursiveContentEditor
                  enData={enVal}
                  frData={frVal}
                  path={[...path, key]}
                  onChange={onChange}
                />
              </div>
            </div>
          );
        }

        // Otherwise, treat it as a string field
        return (
          <div key={key} className="my-4">
            <label className="block text-gray-500 uppercase text-sm mb-2">
              {key}
            </label>
            <div className="flex gap-4">
              {/* English Field */}
              <div className="flex flex-col w-full">
                <p className="text-gray-700 lowercase text-sm mb-1">🇬🇧</p>
                <textarea
                  className="px-4 pt-2 rounded w-full border"
                  defaultValue={enVal}
                  onChange={(e) => {
                    onChange([...path, key], e.target.value, true);
                  }}
                />
              </div>

              {/* French Field */}
              <div className="flex flex-col w-full">
                <p className="text-gray-700 lowercase text-sm mb-1">🇫🇷</p>
                <textarea
                  className="px-4 pt-2 rounded w-full border"
                  defaultValue={frVal}
                  onChange={(e) => {
                    onChange([...path, key], e.target.value, false);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export function PageEditor({ page }: { page: Page }) {
  const [contentEn, setContentEn] = useState(page.content_en);
  const [contentFr, setContentFr] = useState(page.content_fr);
  const [tab, setTab] = useState<'editor' | 'preview-en' | 'preview-fr'>(
    'editor'
  );

  const handleChange = (path: string[], value: string, isEn: boolean) => {
    const newData = isEn ? { ...contentEn } : { ...contentFr };

    let cursor = newData;
    for (let i = 0; i < path.length - 1; i++) {
      cursor = cursor[path[i]];
    }

    cursor[path[path.length - 1]] = value;

    if (isEn) {
      setContentEn(newData);
    } else {
      setContentFr(newData);
    }
  };

  const handleSave = async () => {
    await fetch(`/api/pages/${page.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content_en: contentEn,
        content_fr: contentFr,
      }),
    });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl mb-4">Page Editor - {page.slug}</h1>
      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          <p
            className={`border px-4 py-2 rounded hover:bg-gray-700 hover:cursor-pointer ${
              tab === 'editor' && 'bg-gray-700'
            }`}
            onClick={() => setTab('editor')}
          >
            Editor
          </p>
          <p
            className={`border px-4 py-2 rounded hover:bg-gray-700 hover:cursor-pointer ${
              tab === 'preview-en' && 'bg-gray-700'
            }`}
            onClick={() => setTab('preview-en')}
          >
            Preview 🇬🇧
          </p>
          <p
            className={`border px-4 py-2 rounded hover:bg-gray-700 hover:cursor-pointer ${
              tab === 'preview-fr' && 'bg-gray-700'
            }`}
            onClick={() => setTab('preview-fr')}
          >
            Preview 🇫🇷
          </p>
        </div>
        <div className="flex flex-col">
          {tab === 'editor' ? (
            <div className="flex flex-col">
              <RecursiveContentEditor
                enData={contentEn}
                frData={contentFr}
                path={[]}
                onChange={handleChange}
              />
              <button
                className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md mt-4"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 border px-4 rounded bg-black">
              <Home content={tab === 'preview-en' ? contentEn : contentFr} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type FocusedItem = {
  type: 'page' | 'event';
  slug: string;
};

export default function Editor({ pages }: { pages: Page[] }) {
  const [breadCrumb, setBreadCrumb] = useState<string[]>(['/', 'page', 'home']);
  const [focus, setFocus] = useState<FocusedItem>({
    type: 'page',
    slug: 'home',
  });

  const handleMenuSelect = ({ type, slug }: FocusedItem): undefined => {
    setBreadCrumb(['/', type, slug]);
  };

  return (
    <div className="flex justify-between mr-4 gap-4">
      <SideBar pages={pages} onSelect={handleMenuSelect} />
      <div className="flex flex-col w-full gap-4">
        <div className="flex gap-4 mt-4">
          {breadCrumb.map((slug, i) => (
            <div
              className={`flex gap-4 ${
                i < breadCrumb.length - 1 ? 'text-gray-500' : 'text-gray-200'
              } `}
              key={`bread-${i}`}
            >
              <p className="hover:cursor-pointer hover:underline underline-offset-4">
                {slug}
              </p>
              {i < breadCrumb.length - 1 && <p>{'>'}</p>}
            </div>
          ))}
        </div>
        <div className="bg-[#18181A] rounded-md w-full p-8 h-full">
          {focus.type === 'page' ? (
            <PageEditor page={pages.find((page) => page.slug === focus.slug)} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // fetch pages using prisma
  const prisma = new PrismaClient();
  const pages = await prisma.page.findMany();

  // return pages as props
  return {
    props: {
      pages: pages.map((page) => ({
        slug: page.slug,
        content_en: JSON.parse(page.content_en),
        content_fr: JSON.parse(page.content_fr),
      })),
    },
  };
}
