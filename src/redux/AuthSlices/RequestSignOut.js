import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const RequestSingOut = createAsyncThunk(
    "RequestSingOut",
    async (parameter, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const request = await fetch(
                `https://api.themoviedb.org/3/authentication/session?api_key=${
                    import.meta.env.VITE_TMDB_v4_omar
                }`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        session_id: localStorage.getItem("sessionId")
                    })
                }
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
    RequestSingOutDetails: null,
    RequestSingOutDetailsLoading: false,
    RequestSingOutDetailsError: false
};

const deleteSession = createSlice({
    name: "deleteSession",
    initialState,

    extraReducers: builder => {
        builder.addCase(RequestSingOut.pending, state => {
            state.RequestSingOutDetailsLoading = true;
        });
        builder.addCase(RequestSingOut.fulfilled, (state, { payload }) => {
            state.RequestSingOutDetails = payload;
            state.RequestSingOutDetailsLoading = false;
        });
        builder.addCase(RequestSingOut.rejected, state => {
            state.RequestSingOutDetailsError = true;
            state.RequestSingOutDetailsLoading = false;
        });
    }
});

export const RequestSignOutReducer = deleteSession.reducer;
