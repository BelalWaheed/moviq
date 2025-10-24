import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetPersonCombinedCredits = createAsyncThunk(
    "GetPersonCombinedCredits",
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
                `https://api.themoviedb.org/3/person/${personId}/combined_credits?language=en-US`,
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
    personCombinedCreditsDetails: null,
    personCombinedCreditsDetailsLoading: false,
    personCombinedCreditsDetailsError: false
};

const personCombinedCredits = createSlice({
    name: "personCombinedCredits",
    initialState,

    extraReducers: builder => {
        builder.addCase(
            GetPersonCombinedCredits.pending,
            (state, { payload }) => {
                state.personCombinedCreditsDetailsLoading = true;
            }
        );
        builder.addCase(
            GetPersonCombinedCredits.fulfilled,
            (state, { payload }) => {
                state.personCombinedCreditsDetails = payload;

                state.personCombinedCreditsDetailsLoading = false;
            }
        );
        builder.addCase(
            GetPersonCombinedCredits.rejected,
            (state, { payload }) => {
                state.personCombinedCreditsDetailsError = true;
                state.personCombinedCreditsDetailsLoading = false;
            }
        );
    }
});

export const personCombinedCreditsReducer = personCombinedCredits.reducer;
