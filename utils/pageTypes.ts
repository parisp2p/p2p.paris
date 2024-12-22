export type HomePage = {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    btn: {
      text: string;
      link: string;
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
        title: 'Bienvenue chez Paris P2P',
        subtitle: 'Une communauté de développeurs, designers et entrepreneurs',
        description:
          "Nous sommes une communauté de développeurs, designers et entrepreneurs qui veulent partager leurs connaissances et s'aider mutuellement à grandir. Nous organisons des événements, des ateliers et des hackathons pour vous aider à apprendre de nouvelles compétences et à rencontrer de nouvelles personnes.",
        btn: {
          text: 'Rejoignez-nous',
          link: '/rejoindre',
        },
      },
      upcomingEventCTA: {
        title: 'Rejoignez-nous à notre prochain événement',
        subtitle:
          'Rencontrez de nouvelles personnes, apprenez de nouvelles compétences et amusez-vous',
        btn_text: 'RSVP',
      },
    },
    en: {
      hero: {
        title: 'Welcome to Paris P2P',
        subtitle: 'A community of developers, designers, and entrepreneurs',
        description:
          'We are a community of developers, designers, and entrepreneurs who want to share knowledge and help each other grow. We host events, workshops, and hackathons to help you learn new skills and meet new people.',
        btn: {
          text: 'Join us',
          link: '/join',
        },
      },
      upcomingEventCTA: {
        title: 'Join us at our next event',
        subtitle: 'Meet new people, learn new skills, and have fun',
        btn_text: 'RSVP',
      },
    },
  },
};
