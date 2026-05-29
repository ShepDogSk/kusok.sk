import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "kusok.sk — Kúsok kože, kus duše",
    short_name: "kusok.sk",
    description: "Ručne šité kožené výrobky — peňaženky, opasky, puzdrá.",
    start_url: "/",
    display: "browser",
    background_color: "#1a0e07",
    theme_color: "#1a0e07",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

