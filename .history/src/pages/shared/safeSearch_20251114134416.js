export function safeFilter(results = []) {
    if (!Array.isArray(results)) return [];

    // Strict NSFW keywords (direct & unsafe)
    const banned = [
        "porn",
        "pornographic",
        "xxx",
        "hentai",
        "erotic",
        "erotica",
        "explicit sex",
        "adult video",
        "sexual acts",
        "nsfw",
        "nudity",
        "nude",
        "fetish",
        "seduce",
        "seduction"
    ];

    const bannedRegex = new RegExp(`\\b(${banned.join("|")})\\b`, "i");

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
