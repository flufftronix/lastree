export type SiteSocialLink = {
  href: string;
  ariaLabel: string;
  icon: string;
};

export type SiteLinkCard = {
  href?: string;
  title: string;
  subtitle: string;
  icon: string;
  trailingIcon: string;
  style: string;
  isContact?: boolean;
};

export const site = {
  seo: {
    title: 'Michael Lasday @flufftronix',
    ogTitle: 'Michael Lasday',
    twitterTitle: 'Michael Lasday',
    description:
      'Designer, tinkerer, developer, harm reductionist.',
    url: 'https://lasday.com',
    image: 'https://i.imgur.com/4O5023q.jpeg',
    siteName: 'Michael Lasday',
    locale: 'en_US',
    twitterSite: '@flufftronix',
    twitterCreator: '@flufftronix',
  },

  featuredLink: {
    href: 'https://cal.com/mlasday',
    title: '1:1 Consulting',
    subtitle: 'Schedule a meeting with me',
  },

  profile: {
    avatarSrc: 'https://i.imgur.com/eeK4hx7.png',
    name: 'Michael Lasday',
    handle: '@flufftronix',
    bio: 'Designer, tinkerer, developer, harm reductionist.',
  },

  socialLinks: [
    {
      href: 'https://twitter.com/flufftronix',
      ariaLabel: 'Twitter',
      icon: 'twitter',
    },
    {
      href: 'https://fb.com/fluffs',
      ariaLabel: 'Facebook',
      icon: 'facebook',
    },
    {
      href: 'https://github.com/flufftronix',
      ariaLabel: 'GitHub',
      icon: 'github',
    },
    {
      href: 'https://instagram.com/flufftronix',
      ariaLabel: 'Instagram',
      icon: 'instagram',
    },
  ] satisfies SiteSocialLink[],

linkCards: [
//  {
//    href: 'https://cool.industries',
//    title: 'Cool Industries',
//    subtitle: 'Cool solutions for a cool world.',
//    icon: '🧊',
//    trailingIcon: '🧊',
//    style: 'background-color: rgba(0, 0, 0, 0); color: rgb(0, 0, 0);',
//  },
  {
    href: 'https://yerp.io/',
    title: 'YERP!',
    subtitle: 'Your Emergency Response Platform',
    icon: '🙋‍♂️',
    trailingIcon: '🙋‍♂️',
    style: 'background-color: rgba(0, 0, 0, 0); color: rgb(0, 0, 0);',
  },
  {
    href: 'https://punkswithlunch.com',
    title: 'South Philly Punks with Lunch',
    subtitle: 'Street-Based Mutual Aid & Harm Reduction',
    icon: '🍲',
    trailingIcon: '🍲',
    style: 'background-color: rgba(0, 0, 0, 0); color: rgb(0, 0, 0);',
  },
  {
    href: 'https://harmreduction.works/',
    title: 'Harm Reduction Works',
    subtitle: 'Support groups for practicing & learning harm reduction',
    icon: '🫂',
    trailingIcon: '🫂',
    style: 'background-color: rgba(0, 0, 0, 0); color: rgb(0, 0, 0);',
  },
  {
    // No href for contact card
    title: 'Contact Me',
    subtitle: 'Send me a message',
    icon: '📧',
    trailingIcon: '📧',
    style: 'background-color: rgba(0, 0, 0, 0); color: rgb(0, 0, 0);',
    isContact: true,  // Flag to identify this card
  },
] satisfies SiteLinkCard[],
} as const;
