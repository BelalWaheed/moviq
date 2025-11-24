import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddFavorite = createAsyncThunk(
    "AddFavorite",
    async ({ sessionId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const options = {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                },
                body: JSON.stringify({
                    name: "This is my awesome test list.",
                    description: "Just an awesome list.",
                    language: "en"
                })
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/list?session_id=${sessionId}`,
                options
            );
            const response = await request.json();
            if (response.success === false) {
                return rejectWithValue(response);
            }
            return response;
        } catch (e) {
            return rejectWithValue({ success: false, message: e.message });
        }
    }
);

const initialState = {
    favoriteDetails: null,
    favoriteLoading: false,
    favoriteError: false
};

const favorite = createSlice({
    name: "favorite",
    initialState,

    extraReducers: builder => {
        builder.addCase(AddFavorite.pending, (state, { payload }) => {
            state.favoriteLoading = true;
        });
        builder.addCase(AddFavorite.fulfilled, (state, { payload }) => {
            state.favoriteDetails = payload;

            state.favoriteLoading = false;
        });
        builder.addCase(AddFavorite.rejected, (state, { payload }) => {
            state.favoriteError = true;
            state.favoriteLoading = false;
        });
    }
});

export const favoriteReducer = favorite.reducer;
