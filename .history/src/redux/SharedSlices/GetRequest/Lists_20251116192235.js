import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetLists = createAsyncThunk(
    "GetLists",
    async ({ pageNumber = 2, accountId, sessionId }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_v3_omar}`
                }
            };
            const request = await fetch(
                `https://api.themoviedb.org/3/account/${accountId}/lists?pageNumber=${2}&session_id=${sessionId}`,
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
    userListDetails: null,
    userListLoading: false,
    userListError: false
};

const list = createSlice({
    name: "list",
    initialState,

    extraReducers: builder => {
        builder.addCase(GetLists.pending, (state, { payload }) => {
            state.userListLoading = true;
        });
        builder.addCase(GetLists.fulfilled, (state, { payload }) => {
            state.userListDetails = payload;

            state.userListLoading = false;
        });
        builder.addCase(GetLists.rejected, (state, { payload }) => {
            state.userListError = true;
            state.userListLoading = false;
        });
    }
});

export const getListsReducer = list.reducer;
