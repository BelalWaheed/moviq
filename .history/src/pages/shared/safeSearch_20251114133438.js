export function safeFilter(results = []) {
    if (!Array.isArray(results)) return [];

    // كلمات 100% NSFW فقط
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
        "nsfw"
    ];

    const bannedRegex = new RegExp(`\\b(${banned.join("|")})\\b`, "i");

    // الأنواع اللي عمرها ما تعتبر NSFW
    const safeGenres = [
        "crime",
        "drama",
        "action",
        "thriller",
        "mystery",
        "sci-fi",
        "adventure",
        "fantasy",
        "superhero"
    ];

    return results.filter(item => {
        if (!item) return false;

        const title = (item.title || item.name || "").toLowerCase();
        const overview = (item.overview || "").toLowerCase();
        const text = `${title} ${overview}`;

        // لو العمل موسوم adult = شيله
        if (item.adult === true) return false;

        // ⭐ أي عمل مشهور ممنوع يتفلتر مهما حصل
        const isPopular =
            (item.vote_average || 0) >= 7 || (item.popularity || 0) > 15;

        if (isPopular) return true;

        // ⭐ لو نوعه من الأنواع الآمنة → ممنوع يتشال
        const genres = item.genres?.map(g => g.name?.toLowerCase() || "") || [];

        if (genres.some(g => safeGenres.includes(g))) {
            return true;
        }

        // فلترة الكلمات الممنوعة الأساسية فقط
        if (bannedRegex.test(text)) return false;

        return true;
    });
}
