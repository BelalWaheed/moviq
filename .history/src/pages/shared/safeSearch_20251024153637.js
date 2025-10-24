export function safeFilter(results = []) {
  if (!Array.isArray(results)) return [];

  // Comprehensive NSFW keywords list
  const bannedWords = [
    // Explicit terms
    "sex",
    "sexual",
    "sexuality",
    "nudity",
    "nude",
    "naked",
    "erotic",
    "erotica",
    "porn",
    "pornographic",
    "adult",
    "explicit",
    "xxx",
    "hentai",
    "ecchi",

    // Soft  indicators
    "fetish",
    "strip",
    "stripper",
    "striptease",
    "affair",
    "affairs",
    "intimate",
    "intimacy",
    "seduce",
    "seduction",
    "seductive",
    "lust",
    "lustful",
    "Horny",
    "18+",
    "18",
    "ASMR",

    // Suggestive terms
    "provocative",
    "sensual",
    "sensuality",
    "desire",
    "pleasure",
    "passionate",
    "guilty pleasure",
    "forbidden",
    "temptation",
    "tempting",

    // Relationship/romance red flags (context-dependent)
    "mistress",
    "lover",
    "lovers",
    "obsession",
    "obsessed",
    "steamy",

    // Body/physical suggestive terms
    "body",
    "bodies",
    "curves",
    "revealing",
    "exposed",
    "bare",
    "breast",
    "breasts",
    "cleavage",
    "panty",
    "panties",
    "underwear",
    "bikini",

    // Genre/style indicators
    "softcore",
    "mature",
    "rated r",
    "unrated",
    "provocative drama",

    // Euphemisms and unclear sexy terms
    "naughty",
    "dirty",
    "kinky",
    "wild night",
    "one night",
    "secret affair",
    "behind closed doors",
    "after dark",
    "private",
    "indecent",

    // Specific content flags
    "high school",
    "schoolgirl",
    "schoolboy",
    "teen",
    "teenage romance",
    "coming of age",

    // Anime-specific red flags
    "harem",
    "reverse harem",
    "fanservice",
    "fan service",
    "bath scene",
    "hot springs",
    "accidental",
    "stumble",
    "walk in",
    "animal ears",
    "cat girl",
    "catgirl",
    "dog girl",
    "fox girl",
    "kemonomimi",
    "beast",
    "furry",

    // Known problematic content
    "anais nin",
    "anaïs nin",
    "henry & june",
    "diaries",
    "fifty shades",
    "emmanuelle",
    "blue lagoon",
    "dog days",

    // Additional context clues
    "thriller",
    "psychological thriller",
    "obsessive",
    "stalker",
    "bedroom",
    "bed",
    "sheets",
    "massage",
    "touch",
    "caress",
    "Pretty Young Sister",
    "Raw Squeezing",
    "Fantasy ",
    "maid",
    "high school",
    "bunny girl",
    "exercise routines",
    "summer camp",
  ];

  // Pattern-based detection for phrases
  const suspiciousPatterns = [
    /\btwo\s+(women|men|people)\s+(and|&)\s+(a|one)\s+(man|woman)/i,
    /\b(sexual|erotic|steamy|hot)\s+(thriller|drama|romance)/i,
    /\b(forbidden|secret|hidden)\s+(love|romance|affair|relationship)/i,
    /\b(young|teen|teenage)\s+(love|romance|passion)/i,
    /\b(one|single)\s+night\s+(stand|together|affair)/i,
    /\b(behind|after)\s+(closed\s+doors|dark)/i,
    /\b(mature|adult)\s+(content|themes|situations)/i,
    /\b(explores?\s+)?(sexuality|desire|passion)/i,
    /\bseductive\s+(woman|man|stranger)/i,
    /\b(no\s+strings|casual)\s+(sex|encounter|relationship)/i,
    /\banimal\s+ears/i,
    /\b(cat|dog|fox|bunny)\s+(girl|boy|ears)/i,
    /\b(harem|reverse\s+harem)/i,
    /\b(fan\s?service|fanservice)/i,
    /\bsummoned\s+to\s+(another|alternate)\s+world/i,
    /\blook\s+like\s+humans?\s+but\s+with/i,
    /\bhero.*alternate\s+world/i,
  ];

  // Create regex from banned words (word boundaries for accuracy)
  const unsafeRegex = new RegExp(`\\b(${bannedWords.join("|")})\\b`, "i");

  return results.filter((item) => {
    if (!item) return false;

    // Check explicit adult flag
    if (item.adult === true) return false;

    // Combine all text fields for comprehensive scanning
    const title = (item.name || item.title || "").toLowerCase();
    const overview = (item.overview || "").toLowerCase();
    const genres =
      item.genres?.map((g) => g.name?.toLowerCase() || "").join(" ") || "";
    const tagline = (item.tagline || "").toLowerCase();

    const combinedText = `${title} ${overview} ${genres} ${tagline}`;

    // Check for banned words
    if (unsafeRegex.test(combinedText)) return false;

    // Check for suspicious patterns
    if (suspiciousPatterns.some((pattern) => pattern.test(combinedText)))
      return false;

    // Additional heuristic checks

    // Check if title + overview combination seems suspicious
    const titleOverviewCombo = `${title} ${overview}`;
    const suspiciousWordCount = bannedWords.filter((word) =>
      titleOverviewCombo.includes(word.toLowerCase())
    ).length;

    // If multiple suspicious words appear together, flag it
    if (suspiciousWordCount >= 2) return false;

    // Check for common NSFW genre combinations
    const genresLower = genres.toLowerCase();
    if (
      (genresLower.includes("romance") && genresLower.includes("thriller")) ||
      (genresLower.includes("drama") &&
        overview.match(/\b(passion|desire|obsess)/i))
    ) {
      // Additional scrutiny for romance thrillers
      if (
        unsafeRegex.test(overview) ||
        suspiciousPatterns.some((p) => p.test(overview))
      ) {
        return false;
      }
    }

    // Check overview length vs suspicious content ratio
    // Sometimes NSFW content has very detailed, suggestive descriptions
    if (overview.length) {
      const words = overview.split(/\s+/);
      const flaggedWords = words.filter((word) =>
        bannedWords.some((banned) => word.includes(banned.toLowerCase()))
      );

      // If more than 5% of words are flagged, it's likely NSFW
      if (flaggedWords.length / words.length > 0.05) return false;
    }

    return true;
  });
}
