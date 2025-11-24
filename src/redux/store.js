// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";

// Series Reducers
import { seriesReducer } from "./SeriesSlices/SeriesSlice";
import { seriesDetailsReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesDetails.js";
import { seriesTrailerReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesTrailer.js";
import { seriesSeasonsReducer } from "./SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSeasons.js";
import { seriesSeasonsAggregateCreditsReducer } from "./SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSesonsAggregateCredits.js";
import { SeriesAggregateCreditsReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesAggregateCredits.js";
import { SeriesRecommendationsReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesRecommendations.js";
import { SeriesExternalLinksReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesExternalLinks.js";
import { SeriesImagesDetailsReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesImages.js";
import { SeriesSimilarReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesSimilar.js";
import { SeriesReviewsReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesReviews.js";
import { SeriesWatchProvidersReducer } from "./SeriesSlices/GetRequest/SeriesDetails/GetSeriesWatchProviders.js";
import { SeriesRatingReducer } from "./SeriesSlices/PostRequest/AddSeriesRating.js";
import { RatedSeriesReducer } from "./SeriesSlices/GetRequest/UserInteractions/GetRatedSeries.js";
import { SeriesSeasonsImagesDetailsReducer } from "./SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSeasonsImages.js";
import { SeriesSeasonsVideosReducer } from "./SeriesSlices/GetRequest/SeriesSeasons/GetSeriesSeasonsVideos.js";
import { SeriesEpisodesDataReducer } from "./SeriesSlices/GetRequest/SeriesEpisodes/GetSeriesEpisodesDetails.js";
import { SeriesEpisodesCreditsDataReducer } from "./SeriesSlices/GetRequest/SeriesEpisodes/GetSeriesEpisodesCredits.js";
import { SeriesEpisodesImagesReducer } from "./SeriesSlices/GetRequest/SeriesEpisodes/GetSeriesEpisodesImages.js";
import { SeriesEpisodesVideosReducer } from "./SeriesSlices/GetRequest/SeriesEpisodes/GetSeriesEpisodesVideos.js";
import { GetAccountSeriesStatesReducer } from "./SeriesSlices/GetRequest/UserInteractions/GetSeriesAccountStates.js";
import { episodesRatingReducer } from "./SeriesSlices/PostRequest/AddSeriesEpisodesRating.js";
import { GetaccountSeriesEpisodesStatesReducer } from "./SeriesSlices/GetRequest/UserInteractions/GetSeriesEpisodesAccountStates.js";

// Movie Reducers
import { moviesReducer } from "./moviesSlices/MoviesSlice";
import { movieDetailsReducer } from "./moviesSlices/getMovieDetails";
import { MovieCreditsReducer } from "./moviesSlices/GetRequest/MovieDetails/GetMovieCredits";
import { MovieRecommendationsReducer } from "./moviesSlices/GetRequest/MovieDetails/GetMovieRecommendations";
import { MovieSimilarReducer } from "./moviesSlices/GetRequest/MovieDetails/GetMovieSimilar";
import { MovieReviewsReducer } from "./moviesSlices/GetRequest/MovieDetails/GetMovieReviews";
import { MovieImagesReducer } from "./moviesSlices/GetRequest/MovieDetails/GetMovieImages";
import { MovieExternalLinksReducer } from "./moviesSlices/GetRequest/MovieDetails/GetMovieExternalLinks";
import { MovieVideosReducer } from "./moviesSlices/GetRequest/MovieDetails/GetMovieVideos";

// Home Reducers
import { mNowReducer } from "./HomeSlices/mNow";
import { mTopReducer } from "./HomeSlices/mTop";
import { tNowReducer } from "./HomeSlices/tNow";
import { tTopReducer } from "./HomeSlices/tTop";
import { searchReducer } from "./HomeSlices/searcheSlice.js";

// Shared Reducers
import { PersonReducer } from "./SharedSlices/GetRequest/Person/GetPersonDetails.js";
import { personCombinedCreditsReducer } from "./SharedSlices/GetRequest/Person/GetPersonCombinedCredits.js";
import { favoriteReducer } from "./SharedSlices/PostRequest/AddFavorite.js";
import { watchlistReducer } from "./SharedSlices/PostRequest/AddToWatchlist.js";

// Auth Reducers
import { SignInTokenReducer } from "./AuthSlices/RequestSingIn.js";
import { AccountInfoSliceReducer } from "./AuthSlices/AccountInfo.js";
import { RequestSignOutReducer } from "./AuthSlices/RequestSignOut.js";
import { nowPlayingReducer } from "./HomeSlices/nowPlayingSlice.js";
import { topRatedReducer } from "./HomeSlices/topRatedSlice.js";

const store = configureStore({
    reducer: {
        // Series
        seriesReducer,
        seriesDetailsReducer,
        seriesTrailerReducer,
        seriesSeasonsReducer,
        seriesSeasonsAggregateCreditsReducer,
        SeriesAggregateCreditsReducer,
        SeriesRecommendationsReducer,
        SeriesExternalLinksReducer,
        SeriesImagesDetailsReducer,
        SeriesSimilarReducer,
        SeriesReviewsReducer,
        SeriesWatchProvidersReducer,
        SeriesRatingReducer,
        RatedSeriesReducer,
        SeriesSeasonsImagesDetailsReducer,
        SeriesSeasonsVideosReducer,
        SeriesEpisodesDataReducer,
        SeriesEpisodesCreditsDataReducer,
        SeriesEpisodesImagesReducer,
        SeriesEpisodesVideosReducer,
        GetAccountSeriesStatesReducer,
        episodesRatingReducer,
        GetaccountSeriesEpisodesStatesReducer,

        // Movies
        moviesReducer,
        movieDetailsReducer,
        MovieCreditsReducer,
        MovieRecommendationsReducer,
        MovieSimilarReducer,
        MovieReviewsReducer,
        MovieImagesReducer,
        MovieExternalLinksReducer,
        MovieVideosReducer,

        // Home
        mNowReducer,
        mTopReducer,
        tNowReducer,
        tTopReducer,
        searchReducer,

        // Shared
        PersonReducer,
        personCombinedCreditsReducer,
        favoriteReducer,
        watchlistReducer,

        // Auth
        SignInTokenReducer,
        AccountInfoSliceReducer,
        RequestSignOutReducer,


        //new home
        nowPlayingReducer,
        topRatedReducer
    }
});

export default store;
