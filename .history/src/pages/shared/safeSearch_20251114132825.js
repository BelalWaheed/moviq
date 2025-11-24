export function safeFilter(results = []) {
    if (!Array.isArray(results)) return [];

    // أقل قائمة ممكنة لكلمات مباشرة فعلاً
    const hardcoreWords = [
        "porn",
        "pornographic",
        "xxx",
        "hentai",
        "erotic",
        "nsfw",
        "sex scene",
        "explicit sex",
        "sexual acts",
        "adult video"
    ];

    // كلمة واحدة عامة مش هتشيل فيلم محترم
    const softWords = [
        "nudity",
        "nude",
        "sexual",
        "seduce",
        "seduction",
        "fetish"
    ];

    const hardcoreRegex = new RegExp(`\\b(${hardcoreWords.join("|")})\\b`, "i");
    const softRegex = new RegExp(`\\b(${softWords.join("|")})\\b`, "i");

    return results.filter(item => {
        if (!item) return false;

        // أي عمل adult = شيله
        if (item.adult === true) return false;

        const title = (item.title || item.name || "").toLowerCase();
        const overview = (item.overview || "").toLowerCase();

        const text = `${title} ${overview}`;

        // 🚫 لو فيه كلمة صريحة
        if (hardcoreRegex.test(text)) return false;

        // ⭐ الأعمال الكبيرة لازم نفوتها (Breaking Bad, The Boys…)
        const isPopular =
            (item.vote_average || 0) >= 6.8 || (item.popularity || 0) > 20;

        // لو مش مشهور → طبق فلترة soft
        if (!isPopular && softRegex.test(text)) {
            return false;
        }

        // 🤝 السماح بأعمال الإثارة، الجريمة، الأكشن، السوبرهيروز
        // لأنها طبيعية تحتوي كلمات ممكن تتفهم غلط
        const allowedGenres = [
            "drama",
            "crime",
            "action",
            "thriller",
            "sci-fi"
        ];
        const genres = item.genres?.map(g => g.name?.toLowerCase() || "") || [];

        const isSafeGenre = genres.some(g => allowedGenres.includes(g));
        if (isSafeGenre) return true;

        // لو مفيش حاجة مريبة خلاص نعديه
        return true;
    });
}
