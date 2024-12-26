export type HomePage = {
  hero: {
    nextMainEvent: {
      title: string;
      subtitle: string;
      descriptionTitle: string;
      descriptionItems: string[];
    };
    parisP2P: {
      title: string;
    };
    hackathon: {
      title: string;
      subtitle: string;
      btn: {
        text: string;
        link: string;
      };
    };
  };
  upcomingEventCTA: {
    title: string;
    subtitle: string;
    btn_text: string;
  };
};

export const defaultPagesContent = {
  home: {
    fr: {
      hero: {
        nextMainEvent: {
          title: "Prochain événement principal",
          subtitle: "Du 4 au 9 avril 2025 Paris & Monde",
          descriptionTitle: "Gratuit pour tous",
          descriptionItems: [
            "/conférences",
            "/ateliers",
            "/hackathon",
            "/coworking gratuit",
          ],
        },
        parisP2P: {
          title: "Paris P2P_",
        },
        hackathon: {
          title: "10 000$",
          subtitle: "Prix cash du Hackathon",
          btn: {
            text: "S'inscrire",
            link: "/rejoindre",
          },
        },
      },
      upcomingEventCTA: {
        title: "Rejoignez-nous à notre prochain événement",
        subtitle:
          "Rencontrez de nouvelles personnes, apprenez de nouvelles compétences et amusez-vous",
        btn_text: "RSVP",
      },
    },
    en: {
      hero: {
        nextMainEvent: {
          title: "Next main event",
          subtitle: "April 4th to 9th, 2025 Paris & World Wide",
          descriptionTitle: "Free for all",
          descriptionItems: [
            "/conferences",
            "/workshops",
            "/hackathon",
            "/free co-working",
          ],
        },
        parisP2P: {
          title: "Paris P2P_",
        },
        hackathon: {
          title: "$10 000",
          subtitle: "Hackathon cashprize",
          btn: {
            text: "Register",
            link: "/join",
          },
        },
      },
      upcomingEventCTA: {
        title: "Join us at our next event",
        subtitle: "Meet new people, learn new skills, and have fun",
        btn_text: "RSVP",
      },
    },
  },
};
