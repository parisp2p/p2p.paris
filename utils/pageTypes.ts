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
  buttons: {
    getTicket: {
      title: string;
      link: string;
    };
    joinHackathon: {
      title: string;
      link: string;
    };
  };
  donate: {
    title: string;
    description: string;
    buttonText: string;
  };
  coOrg: {
    title: string;
    buttonText: string;
  };
  schedule: {
    title: string;
    filterTitle: string;
    kind: string;
    location: string;
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
      buttons: {
        getTicket: { title: "Obtenez votre billet", link: "" },
        joinHackathon: { title: "Rejoignez le hackathon", link: "" },
      },
      donate: {
        title: "Vous aimez cette initiative et souhaitez nous aider ?",
        description:
          "Vous pouvez montrer votre soutien en faisant un don pour aider à financer cet événement gratuit et les prochains…",
        buttonText: "Faire un don",
      },
      coOrg: {
        title: "Co-Org et sponsors",
        buttonText: "Devenez parrain",
      },
      schedule: {
        title: "Calendrier",
        filterTitle: "Filtrer les événements",
        kind: "Gentil",
        location: "Emplacement",
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
      buttons: {
        getTicket: { title: "Get your ticket", link: "" },
        joinHackathon: { title: "Join Hackathon", link: "" },
      },
      donate: {
        title: "You like this initiative and want to help us?",
        description:
          "You can show your support by donating to help funding this free event and the next ones…",
        buttonText: "Donate",
      },
      coOrg: {
        title: "Co-Org and sponsors",
        buttonText: "Become a sponsor",
      },
      schedule: {
        title: "Schedule",
        filterTitle: "Filter events",
        kind: "Kind",
        location: "Location",
      },
      upcomingEventCTA: {
        title: "Join us at our next event",
        subtitle: "Meet new people, learn new skills, and have fun",
        btn_text: "RSVP",
      },
    },
  },
};
