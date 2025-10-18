import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://moviqq.vercel.app";

const routes = [
  "/",
  "/movies",
  "/series",
  "/AllCastSeries",
  "/seriesDetails",
  "/SeasonDetailsCast",
  "/AllEpisode",
  "/SeasonDetails",
  "/moviedetails",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${routes
  .map(
    (route) => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("")}
</urlset>
`;

const outputPath = path.join(__dirname, "public", "sitemap.xml");

fs.writeFileSync(outputPath, sitemap, "utf8");

console.log("✅ Sitemap generated successfully at:", outputPath);
