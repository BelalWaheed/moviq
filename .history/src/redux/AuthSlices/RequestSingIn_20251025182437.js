import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// const { isLogged } = useSelector(state => {
//     state.AccountInfoSliceReducer;
// });
export const RequestSingIn = createAsyncThunk(
    "RequestSingIn",
    async (parameter, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const request = await fetch(
                `https://api.themoviedb.org/3/authentication/token/new?api_key=${
                    import.meta.env.VITE_TMDB_v4_omar
                }`
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
    RequestSingInDetails: null,
    RequestSingInDetailsLoading: false,
    RequestSingInDetailsError: false
};

const SignInToken = createSlice({
    name: "SignInToken",
    initialState,

    extraReducers: builder => {
        builder.addCase(RequestSingIn.pending, state => {
            state.RequestSingInDetailsLoading = true;
        });
        builder.addCase(RequestSingIn.fulfilled, (state, { payload }) => {
            state.RequestSingInDetails = payload;
            state.RequestSingInDetailsLoading = false;
            if (payload.success && payload.request_token) {
                localStorage.setItem("token", payload.request_token);
            }
        });
        builder.addCase(RequestSingIn.rejected, state => {
            state.RequestSingInDetailsError = true;
            state.RequestSingInDetailsLoading = false;
        });
    }
});

export const SignInTokenReducer = SignInToken.reducer;
