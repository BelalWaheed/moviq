import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get favorite movies
export const GetFavoriteMovies = createAsyncThunk(
    "GetFavoriteMovies",
    async ({ accountId, page = 1 }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const sessionId = localStorage.getItem("sessionId");
            if (!sessionId) {
                return rejectWithValue({ message: "Not authenticated" });
            }

            const request = await fetch(
                `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                    }
                }
            );
            const response = await request.json();
            return response;
        } catch (e) {
            return rejectWithValue({ message: e.message });
        }
    }
);

// Get favorite TV series
export const GetFavoriteSeries = createAsyncThunk(
    "GetFavoriteSeries",
    async ({ accountId, page = 1 }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const sessionId = localStorage.getItem("sessionId");
            if (!sessionId) {
                return rejectWithValue({ message: "Not authenticated" });
            }

            const request = await fetch(
                `https://api.themoviedb.org/3/account/${accountId}/favorite/tv?session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                    }
                }
            );
            const response = await request.json();
            return response;
        } catch (e) {
            return rejectWithValue({ message: e.message });
        }
    }
);

// Get watchlist movies
export const GetWatchlistMovies = createAsyncThunk(
    "GetWatchlistMovies",
    async ({ accountId, page = 1 }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const sessionId = localStorage.getItem("sessionId");
            if (!sessionId) {
                return rejectWithValue({ message: "Not authenticated" });
            }

            const request = await fetch(
                `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                    }
                }
            );
            const response = await request.json();
            return response;
        } catch (e) {
            return rejectWithValue({ message: e.message });
        }
    }
);

// Get watchlist TV series
export const GetWatchlistSeries = createAsyncThunk(
    "GetWatchlistSeries",
    async ({ accountId, page = 1 }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const sessionId = localStorage.getItem("sessionId");
            if (!sessionId) {
                return rejectWithValue({ message: "Not authenticated" });
            }

            const request = await fetch(
                `https://api.themoviedb.org/3/account/${accountId}/watchlist/tv?session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                    }
                }
            );
            const response = await request.json();
            return response;
        } catch (e) {
            return rejectWithValue({ message: e.message });
        }
    }
);

// Get rated movies
export const GetRatedMovies = createAsyncThunk(
    "GetRatedMovies",
    async ({ accountId, page = 1 }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const sessionId = localStorage.getItem("sessionId");
            if (!sessionId) {
                return rejectWithValue({ message: "Not authenticated" });
            }

            const request = await fetch(
                `https://api.themoviedb.org/3/account/${accountId}/rated/movies?session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                    }
                }
            );
            const response = await request.json();
            return response;
        } catch (e) {
            return rejectWithValue({ message: e.message });
        }
    }
);

// Get rated TV series
export const GetRatedSeries = createAsyncThunk(
    "GetRatedSeries",
    async ({ accountId, page = 1 }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const sessionId = localStorage.getItem("sessionId");
            if (!sessionId) {
                return rejectWithValue({ message: "Not authenticated" });
            }

            const request = await fetch(
                `https://api.themoviedb.org/3/account/${accountId}/rated/tv?session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                    }
                }
            );
            const response = await request.json();
            return response;
        } catch (e) {
            return rejectWithValue({ message: e.message });
        }
    }
);

const initialState = {
    favoriteMovies: null,
    favoriteMoviesLoading: false,
    favoriteMoviesError: false,
    
    favoriteSeries: null,
    favoriteSeriesLoading: false,
    favoriteSeriesError: false,
    
    watchlistMovies: null,
    watchlistMoviesLoading: false,
    watchlistMoviesError: false,
    
    watchlistSeries: null,
    watchlistSeriesLoading: false,
    watchlistSeriesError: false,
    
    ratedMovies: null,
    ratedMoviesLoading: false,
    ratedMoviesError: false,
    
    ratedSeries: null,
    ratedSeriesLoading: false,
    ratedSeriesError: false,
};

const ProfileDataSlice = createSlice({
    name: "ProfileData",
    initialState,
    reducers: {
        clearProfileData: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        // Favorite Movies
        builder.addCase(GetFavoriteMovies.pending, (state) => {
            state.favoriteMoviesLoading = true;
            state.favoriteMoviesError = false;
        });
        builder.addCase(GetFavoriteMovies.fulfilled, (state, { payload }) => {
            state.favoriteMovies = payload;
            state.favoriteMoviesLoading = false;
        });
        builder.addCase(GetFavoriteMovies.rejected, (state) => {
            state.favoriteMoviesError = true;
            state.favoriteMoviesLoading = false;
        });

        // Favorite Series
        builder.addCase(GetFavoriteSeries.pending, (state) => {
            state.favoriteSeriesLoading = true;
            state.favoriteSeriesError = false;
        });
        builder.addCase(GetFavoriteSeries.fulfilled, (state, { payload }) => {
            state.favoriteSeries = payload;
            state.favoriteSeriesLoading = false;
        });
        builder.addCase(GetFavoriteSeries.rejected, (state) => {
            state.favoriteSeriesError = true;
            state.favoriteSeriesLoading = false;
        });

        // Watchlist Movies
        builder.addCase(GetWatchlistMovies.pending, (state) => {
            state.watchlistMoviesLoading = true;
            state.watchlistMoviesError = false;
        });
        builder.addCase(GetWatchlistMovies.fulfilled, (state, { payload }) => {
            state.watchlistMovies = payload;
            state.watchlistMoviesLoading = false;
        });
        builder.addCase(GetWatchlistMovies.rejected, (state) => {
            state.watchlistMoviesError = true;
            state.watchlistMoviesLoading = false;
        });

        // Watchlist Series
        builder.addCase(GetWatchlistSeries.pending, (state) => {
            state.watchlistSeriesLoading = true;
            state.watchlistSeriesError = false;
        });
        builder.addCase(GetWatchlistSeries.fulfilled, (state, { payload }) => {
            state.watchlistSeries = payload;
            state.watchlistSeriesLoading = false;
        });
        builder.addCase(GetWatchlistSeries.rejected, (state) => {
            state.watchlistSeriesError = true;
            state.watchlistSeriesLoading = false;
        });

        // Rated Movies
        builder.addCase(GetRatedMovies.pending, (state) => {
            state.ratedMoviesLoading = true;
            state.ratedMoviesError = false;
        });
        builder.addCase(GetRatedMovies.fulfilled, (state, { payload }) => {
            state.ratedMovies = payload;
            state.ratedMoviesLoading = false;
        });
        builder.addCase(GetRatedMovies.rejected, (state) => {
            state.ratedMoviesError = true;
            state.ratedMoviesLoading = false;
        });

        // Rated Series
        builder.addCase(GetRatedSeries.pending, (state) => {
            state.ratedSeriesLoading = true;
            state.ratedSeriesError = false;
        });
        builder.addCase(GetRatedSeries.fulfilled, (state, { payload }) => {
            state.ratedSeries = payload;
            state.ratedSeriesLoading = false;
        });
        builder.addCase(GetRatedSeries.rejected, (state) => {
            state.ratedSeriesError = true;
            state.ratedSeriesLoading = false;
        });
    }
});

export const { clearProfileData } = ProfileDataSlice.actions;
export const ProfileDataReducer = ProfileDataSlice.reducer;
