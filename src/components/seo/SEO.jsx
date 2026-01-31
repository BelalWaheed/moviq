/**
 * SEO Component - React 19 Native Document Metadata
 * 
 * Uses React 19's built-in support for rendering <title>, <meta>, and <link>
 * tags directly in components - they automatically hoist to <head>.
 */

const SEO = ({
    title,
    description,
    keywords,
    image = "/og-image.jpg",
    type = "website",
    url,
    siteName = "Moviq",
    twitterHandle = "@moviq"
}) => {
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const metaDescription = description || "Discover and explore movies and TV series. Your ultimate entertainment guide.";
    const metaKeywords = keywords || "movies, series, films, TV shows, streaming, entertainment";
    const canonicalUrl = url || (typeof window !== "undefined" ? window.location.href : "");

    return (
        <>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            
            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:site_name" content={siteName} />
            {image && <meta property="og:image" content={image} />}
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            {image && <meta name="twitter:image" content={image} />}
            {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
        </>
    );
};

export default SEO;
