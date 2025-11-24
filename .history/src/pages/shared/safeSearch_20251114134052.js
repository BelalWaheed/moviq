export function safeFilter(results = []) {
    if (!Array.isArray(results)) return [];

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

    const forbiddenGenres = ["romance", "adult"];

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

        // ممنوع أعمال adult
        if (item.adult === true) return false;

        // ممنوع أنواع romance نهائيًا
        const genres = item.genres?.map(g => g.name?.toLowerCase() || "") || [];

        if (genres.some(g => forbiddenGenres.includes(g))) {
            return false;
        }

        // لو العمل مشهور جدًا وبعيد عن romance → نعديه
        const isPopular =
            (item.vote_average || 0) >= 7 || (item.popularity || 0) > 15;

        if (isPopular && genres.some(g => safeGenres.includes(g))) {
            return true;
        }

        // فلترة الكلمات الجنسية
        if (bannedRegex.test(text)) return false;

        return true;
    });
}
