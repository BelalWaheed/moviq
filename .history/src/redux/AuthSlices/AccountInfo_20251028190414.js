import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AccountInfo = createAsyncThunk(
    "AccountInfo",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const params = new URLSearchParams(window.location.search);
            const approved = params.get("approved");
            const token = localStorage.getItem("token");

            if (localStorage.getItem("sessionId")) {
                // get user data
                const accountRes = await fetch(
                    `https://api.themoviedb.org/3/account?session_id=${localStorage.getItem(
                        "sessionId"
                    )}&api_key=${import.meta.env.VITE_TMDB_v4_omar}`,
                    {
                        method: "GET",
                        headers: {
                            accept: "application/json"
                        }
                    }
                );

                const accountData = await accountRes.json();
                console.log(accountData);

                return accountData;
            } else {
                if (approved === "true" && token) {
                    // create sessionId
                    const request = await fetch(
                        "https://api.themoviedb.org/3/authentication/session/new?api_key=${import.meta.env.VITE_TMDB_v4_omar}",
                        {
                            method: "POST",
                            headers: {
                                accept: "application/json",
                                "content-type": "application/json"
                            },
                            body: JSON.stringify({ request_token: token })
                        }
                    );

                    const response = await request.json();

                    if (!response.success) {
                        return rejectWithValue(response);
                    }

                    localStorage.setItem("sessionId", response.session_id);
                    localStorage.removeItem("token");

                    // get user data
                    const accountRes = await fetch(
                        `https://api.themoviedb.org/3/account?session_id=${
                            response.session_id
                        }&api_key=${import.meta.env.VITE_TMDB_v4_omar}`,
                        {
                            method: "GET",
                            headers: {
                                accept: "application/json"
                            }
                        }
                    );

                    const accountData = await accountRes.json();

                    return accountData;
                } else {
                    return rejectWithValue({
                        success: false,
                        message: "User not approved or missing token"
                    });
                }
            }
        } catch (e) {
            return rejectWithValue({ success: false, message: e.message });
        }
    }
);

const initialState = {
    AccountInfoDetails: null,
    AccountInfoDetailsLoading: false,
    AccountInfoDetailsError: false,
    isLogged: false
};

const AccountInfoSlice = createSlice({
    name: "AccountInfoSlice",
    reducers: {
        signOut: state => {
            localStorage.removeItem("sessionId");
            state.AccountInfoDetails = null;
            state.isLogged = false;
        }
    },
    initialState,

    extraReducers: builder => {
        builder.addCase(AccountInfo.pending, state => {
            state.AccountInfoDetailsLoading = true;
        });
        builder.addCase(AccountInfo.fulfilled, (state, { payload }) => {
            state.AccountInfoDetails = payload;
            state.AccountInfoDetailsLoading = false;
            state.isLogged = true;
        });
        builder.addCase(AccountInfo.rejected, state => {
            state.AccountInfoDetailsError = true;
            state.AccountInfoDetailsLoading = false;
            state.isLogged = false;
        });
    }
});

export const AccountInfoSliceReducer = AccountInfoSlice.reducer;
export const { signOut } = AccountInfoSlice.actions;
