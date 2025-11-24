import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetListsDetails = createAsyncThunk(
    "GetListsDetails",
    async ({ listId, pageNumber }, thunkAPI) => {
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
                `https://api.themoviedb.org/3/list/${listId}?language=en-US&page=${pageNumber}`,
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
    listData: null,
    listDataLoading: false,
    listDataError: false
};

const ListsDetails = createSlice({
    name: "ListsDetails",
    initialState,

    extraReducers: builder => {
        builder.addCase(GetListsDetails.pending, (state, { payload }) => {
            state.listDataLoading = true;
        });
        builder.addCase(GetListsDetails.fulfilled, (state, { payload }) => {
            state.listData = payload;

            state.listDataLoading = false;
        });
        builder.addCase(GetListsDetails.rejected, (state, { payload }) => {
            state.listDataError = true;
            state.listDataLoading = false;
        });
    }
});

export const GetListsDetailsReducer = ListsDetails.reducer;
