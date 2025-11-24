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
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg"
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
    listDetails: null,
    listLoading: false,
    listError: false
};

const list = createSlice({
    name: "list",
    initialState,

    extraReducers: builder => {
        builder.addCase(CreateList.pending, (state, { payload }) => {
            state.listLoading = true;
        });
        builder.addCase(CreateList.fulfilled, (state, { payload }) => {
            state.listDetails = payload;

            state.listLoading = false;
        });
        builder.addCase(CreateList.rejected, (state, { payload }) => {
            state.listError = true;
            state.listLoading = false;
        });
    }
});

export const createListReducer = list.reducer;
