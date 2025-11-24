import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AddSeriesRating } from "../../../redux/SeriesSlices/PostRequest/AddSeriesRating";
import Swal from "sweetalert2";
import { GetRatedSeries } from "../../../redux/SeriesSlices/GetRequest/UserInteractions/GetRatedSeries";
import { RequestSingIn } from "../../../redux/AuthSlices/RequestSingIn";
import { GetSeriesAccountStates } from "../../../redux/SeriesSlices/GetRequest/UserInteractions/GetSeriesAccountStates";

const UserRateSection = () => {
    const dispatch = useDispatch();

    const [value, setValue] = useState("");

    const { AccountInfoDetails, isLogged } = useSelector(
        state => state.AccountInfoSliceReducer
    );
    const { accountSeriesStatesDetails } = useSelector(
        state => state.GetAccountSeriesStatesReducer
    );

    const { SeriesRatingLoading } = useSelector(
        state => state.SeriesRatingReducer
    );

    const handleChange = e => {
        const newValue = e.target.value;

        if (/^\d{0,2}(\.\d?)?$/.test(newValue)) {
            const num = parseFloat(newValue);
            if (isNaN(num) || num <= 10) {
                setValue(newValue);
            }
        }
    };

    useEffect(() => {
        dispatch(
            GetSeriesAccountStates({
                seriesId: localStorage.getItem("seriesId"),
                sessionId: localStorage.getItem("sessionId")
            })
        );
    }, []);

    const handleBlur = () => {
        if (value === "") {
            setValue("");
        } else {
            let newValue = parseFloat(value.replace(",", "."));

            if (isNaN(newValue)) {
                setValue("");
                return;
            }

            if (value.endsWith(".")) {
                newValue = parseFloat(value + "0");
            }

            if (newValue < 0.5) newValue = 0.5;
            if (newValue > 10) newValue = 10;

            const roundedValue = Math.round(newValue * 2) / 2;
            setValue(roundedValue.toFixed(1));
        }
    };
    const handleSubmit = () => {
        if (isLogged && localStorage.getItem("sessionId")) {
            if (value) {
                if (!accountSeriesStatesDetails?.rated) {
                    dispatch(
                        AddSeriesRating({
                            seriesId: localStorage.getItem("seriesId"),
                            sessionId: localStorage.getItem("sessionId"),
                            rate: value
                        })
                    ).then(() =>
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: "Your rating has been submitted successfully.",
                            confirmButtonColor: "#ef4444",
                            background: "#111827",
                            color: "#fff"
                        })
                    );
                } else {
                    Swal.fire({
                        title: "You've already rated this series!",
                        text: "Would you like to update your previous rating?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Yes, update it",
                        cancelButtonText: "No, keep old rating",
                        confirmButtonColor: "#ef4444",
                        cancelButtonColor: "#6b7280",
                        background: "#111827",
                        color: "#fff"
                    }).then(result => {
                        if (result.isConfirmed) {
                            if (
                                accountSeriesStatesDetails?.rated.value == value
                            ) {
                                Swal.fire({
                                    icon: "info",
                                    title: "Same rating detected!",
                                    text: "You already gave this series the same rating before. Please choose a different score if you want to update it.",
                                    confirmButtonText: "Got it",
                                    confirmButtonColor: "#ef4444",
                                    background: "#111827",
                                    color: "#fff"
                                });
                            } else {
                                dispatch(
                                    AddSeriesRating({
                                        seriesId:
                                            localStorage.getItem("seriesId"),
                                        sessionId:
                                            localStorage.getItem("sessionId"),
                                        rate: value
                                    })
                                ).then(() =>
                                    Swal.fire({
                                        icon: "success",
                                        title: "Updated!",
                                        text: "Your rating has been updated successfully.",
                                        confirmButtonColor: "#ef4444",
                                        background: "#111827",
                                        color: "#fff"
                                    })
                                );
                            }
                        }
                    });
                }
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "No rating entered!",
                    text: "Please enter a rating before submitting.",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#ef4444",
                    background: "#111827",
                    color: "#fff"
                });
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "TMDB Connection Required!",
                text: "You need to connect your TMDB account before you can rate any series.",
                showCancelButton: true,
                confirmButtonText: "Connect now",
                cancelButtonText: "Maybe later",
                confirmButtonColor: "#ef4444",
                cancelButtonColor: "#6b7280",
                background: "#111827",
                color: "#fff"
            }).then(result => {
                if (result.isConfirmed) {
                    dispatch(RequestSingIn());
                }
            });
        }
    };

    return (
        <div className="flex items-center gap-3 bg-black/90 px-4 py-3 rounded-2xl border border-gray-900 w-fit shadow-md hover:shadow-lg transition-all duration-200">
            <FaStar className="text-yellow-400 text-2xl drop-shadow-[0_0_5px_rgba(255,215,0,0.4)]" />
            <span className="text-gray-100 text-sm font-semibold tracking-wide">
                Add Rate
            </span>

            <input
                type="text"
                inputMode="decimal"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0.5–10"
                className="w-16 h-9 text-white text-center text-sm rounded-lg border border-gray-900 focus:border-red-500 outline-none bg-transparent transition-all"
            />

            <Typography
                onClick={() => {
                    handleSubmit();
                }}
                as="div"
                size="sm"
                className={`rounded-lg px-3 py-2 flex items-center justify-center shadow-sm transition-all
        ${
            SeriesRatingLoading
                ? "bg-red-400 cursor-not-allowed"
                : "cursor-pointer bg-red-600 hover:bg-red-800 hover:shadow-red-500/30"
        }
    `}>
                {SeriesRatingLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <RiSendPlaneFill size={16} />
                )}
            </Typography>
        </div>
    );
};

export default UserRateSection;
