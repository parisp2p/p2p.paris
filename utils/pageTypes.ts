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
  speakers: {
    title: string;
    buttonText: string;
  };
  usefulInformation: {
    title: string;
    groundControl: {
      title: string;
      desc: string;
      buttonText: string;
    };
    support: {
      title: string;
      desc: string;
      buttonText: string;
    };
    news: {
      title: string;
      desc: string;
      buttonText: string;
      inputPlaceholder: string;
    };
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
      speakers: {
        title: "Haut-parleurs",
        buttonText: "Devenez conférencier",
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
      usefulInformation: {
        title: "Informations utiles",
        groundControl: {
          title: "Contrôle au sol",
          desc: "Gare de Lyon - 81 rue du Charolais 75012 Paris, France",
          buttonText: "Apprendre encore plus",
        },
        support: {
          title: "Soutien",
          desc: "C’est gratuit pour tous mais cela a un coût ! Merci de nous aider à rendre cela possible.",
          buttonText: "Faire un don",
        },
        news: {
          title: "Nouvelles",
          desc: "Recevez les news de dernière minute, le planning définitif...",
          buttonText: "S'abonner",
          inputPlaceholder: "Votre email",
        },
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
      speakers: {
        title: "Speakers",
        buttonText: "Become a Speaker",
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
      usefulInformation: {
        title: "Useful information",
        groundControl: {
          title: "Ground Control",
          desc: "Gare de Lyon - 81 rue du Charolais 75012 Paris, France",
          buttonText: "Learn more",
        },
        support: {
          title: "Support",
          desc: "It’s free for all but it has a cost! Thanks to help us to make it possible.",
          buttonText: "Donate",
        },
        news: {
          title: "News",
          desc: "Receive last minute news, final schedule...",
          buttonText: "Subscribe",
          inputPlaceholder: "Your email",
        },
      },
    },
  },
};
