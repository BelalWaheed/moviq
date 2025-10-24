import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetPersonDetails = createAsyncThunk(
    "GetPersonDetails",
    async ({ personId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg"
                }
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/person/${personId}?language=en-US`,
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
    PersonDetails: null,
    PersonDetailsLoading: false,
    PersonDetailsError: false
};

const Person = createSlice({
    name: "Person",
    initialState,

    extraReducers: builder => {
        builder.addCase(GetPersonDetails.pending, (state, { payload }) => {
            state.PersonDetailsLoading = true;
        });
        builder.addCase(GetPersonDetails.fulfilled, (state, { payload }) => {
            state.PersonDetails = payload;

            state.PersonDetailsLoading = false;
        });
        builder.addCase(GetPersonDetails.rejected, (state, { payload }) => {
            state.PersonDetailsError = true;
            state.PersonDetailsLoading = false;
        });
    }
});

export const PersonReducer = Person.reducer;
