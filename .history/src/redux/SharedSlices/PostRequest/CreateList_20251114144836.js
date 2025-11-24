import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const CreateList = createAsyncThunk(
    "CreateList",
    async ({ name, description, sessionId }, thunkAPI) => {
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
                    name,
                    description,
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
        builder.addCase(CreateList.pending, (state, { payload }) => {
            state.favoriteLoading = true;
        });
        builder.addCase(CreateList.fulfilled, (state, { payload }) => {
            state.favoriteDetails = payload;

            state.favoriteLoading = false;
        });
        builder.addCase(CreateList.rejected, (state, { payload }) => {
            state.favoriteError = true;
            state.favoriteLoading = false;
        });
    }
});

export const favoriteReducer = favorite.reducer;
