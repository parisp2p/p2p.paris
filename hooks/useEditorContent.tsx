import { PageEditorContent } from "@/components/editor/page";
import {
  EventEditorContent,
  LocationEditorContent,
  OrganizationEditorContent,
  SpeakerEditorContent,
  TalkEditorContent,
} from "@/components/editor/types";
import { useEffect, useState } from "react";

const useEditorContent = () => {
  const [data, setData] = useState<{
    pages: PageEditorContent[];
    events: EventEditorContent[];
    locations: LocationEditorContent[];
    speakers: SpeakerEditorContent[];
    organizations: OrganizationEditorContent[];
    talks: TalkEditorContent[];
  }>({
    pages: [],
    events: [],
    locations: [],
    speakers: [],
    organizations: [],
    talks: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const endpoints = [
          "/api/pages",
          "/api/events",
          "/api/locations",
          "/api/speakers",
          "/api/organizations",
          "/api/talks",
        ];

        const [pages, events, locations, speakers, organizations, talks] =
          await Promise.all(
            endpoints.map((endpoint) =>
              fetch(endpoint).then((res) => {
                if (!res.ok) {
                  throw new Error(`Failed to fetch ${endpoint}`);
                }
                return res.json().then((d) =>
                  d.map((item) =>
                    endpoint.includes("pages")
                      ? {
                          ...item,
                          content_en: JSON.parse(item.content_en),
                          content_fr: JSON.parse(item.content_fr),
                        }
                      : item,
                  ),
                );
              }),
            ),
          );

        setData({
          pages,
          events,
          locations,
          speakers,
          organizations,
          talks,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useEditorContent;
