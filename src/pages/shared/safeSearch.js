export function safeFilter(results = []) {
    if (!Array.isArray(results)) return [];
const banned = [
  // Core porn terms
  "porn",
  "porno",
  "pornographic",
  "xxx",
  "xvideos",
  "xhamster",
  "redtube",
  "youporn",

  // NSFW / adult labels
  "nsfw",
  "18+",
  "adult",
  "adults only",
  "explicit",
  "uncensored",

  // Hentai / anime NSFW
  "hentai",
  "ecchi",
  "doujin",
  "doujinshi",
  "yaoi",
  "yuri",
  "ahegao",
  "tentacle",
  "futanari",
  "lewd",

  // Sexual intent / behavior
  "sex",
  "sexual",
  "sexualized",
  "sexual content",
  "sexual acts",
  "intercourse",
  "hardcore",
  "softcore",
  "orgy",
  "orgies",
  "threesome",
  "gangbang",
  "bdsm",
  "kink",
  "fetish",
  "voyeur",
  "exhibitionism",

  // Nudity
  "nudity",
  "nude",
  "naked",
  "bare",
  "topless",
  "bottomless",

  // Seduction / arousal
  "erotic",
  "erotica",
  "sensual",
  "lust",
  "horny",
  "seduce",
  "seduction",
  "foreplay",

  // Sex work / platforms
  "onlyfans",
  "fansly",
  "camgirl",
  "camboy",
  "camshow",
  "webcam",
  "escort",
  "prostitution",
  "hooker",
  "strip",
  "striptease",

  // Common slang
  "milf",
  "nsfw anime",
  "adult anime",
  "rule 34",
  "r34",
  "D×D",
  "Dirty ",
  "vibrator",
  "high school",
  
];

const bannedRegex = new RegExp(
  `\\b(${banned.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
  "i"
);

    // Genres that are not safe for HR-friendly environments
    const forbiddenGenres = ["romance", "adult"];

    // Genres that are always considered safe
    const safeGenres = [
        "crime",
        "drama",
        "action",
        "thriller",
        "mystery",
        "sci-fi",
        "fantasy",
        "adventure",
        "superhero",
        "animation",
        "family"
    ];

    return results.filter(item => {
        if (!item) return false;

        const title = (item.title || item.name || "").toLowerCase();
        const overview = (item.overview || "").toLowerCase();
        const text = `${title} ${overview}`;

        // Reject explicit adult content
        if (item.adult === true) return false;

        // Exclude genres that may contain sensitive or suggestive themes
        const genres = item.genres?.map(g => g.name?.toLowerCase() || "") || [];

        if (genres.some(g => forbiddenGenres.includes(g))) {
            return false;
        }

        // Allow highly popular and well-known titles (as long as genres are safe)
        const isPopular =
            (item.vote_average || 0) >= 7 || (item.popularity || 0) > 15;

        if (isPopular && genres.some(g => safeGenres.includes(g))) {
            return true;
        }

        // Block content containing direct NSFW keywords
        if (bannedRegex.test(text)) return false;

        // Otherwise allow
        return true;
    });
}
