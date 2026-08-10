export const projects = [
  {
    title: "orangishcat's happy place",
    description: "(Personal website, the one you're looking at right now)",
    url: "/",
  },
  {
    title: "Better Clouds",
    description: "A Minecraft mod that adds volumetric clouds in touch with the aesthetic of vanilla Minecraft",
    url: "https://modrinth.com/mod/better-clouds",
    note: "Maintainer"
  },
  {
    title: "Page Proxy",
    description: "A Chrome/Firefox extension that streamlines the process of creating userscripts.",
    url: "https://orangishcat.github.io/page-proxy/"
  },
  {
    title: "cursed-tetris",
    description: "Tetris with powerups, fully in your terminal. My first ever Rust project! I quite enjoyed learning Rust.",
    url: "https://github.com/orangishcat/cursed-tetris"
  },
  {
    title: "Tanks: the Crusades",
    description: "A cross-platform tank game where the player controls a blue tank with the goal of destroying all enemy tanks to clear a level.",
    url: "https://github.com/aehmttw/Tanks",
    note: "Contributor"
  },
];

export const blogs = [
  {
    slug: "personal-website",
    title: "I learned art, design, and webdev to create my personal website!!",
    description: "One of the most rewarding projects I have ever done. I learned so much! It is also the only project of mine as of right now that is mostly finished.",
    date: "July 14, 2026"
  },
  {
    slug: "page-proxy",
    title: "Page Proxy Devlogs",
    description: "Devlogs about my Chrome/Firefox extension and userscript manager, Page Proxy!",
    date: "April 30, 2026"
  }
]

export const routeFor = (entry: any, index: number, prefix: string = "/blog/") =>
  prefix + (index === 0 ? entry.id.split("/")[0] : entry.id);
