import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AddSeriesRating } from "../../../redux/SeriesSlices/PostRequest/AddSeriesRating";
import Swal from "sweetalert2";
import { GetRatedSeries } from "../../../redux/SeriesSlices/GetRequest/UserInteractions/GetRatedSeries";

const UserRateSection = () => {
    const dispatch = useDispatch();

    const [value, setValue] = useState("");

    const { AccountInfoDetails } = useSelector(
        state => state.AccountInfoSliceReducer
    );

    const { RatedSeriesDetails } = useSelector(
        state => state.RatedSeriesReducer
    );

    useEffect(() => {
        dispatch(
            GetRatedSeries({
                accountId: AccountInfoDetails.id,
                sessionId: localStorage.getItem("sessionId")
            })
        );
    }, []);

    console.log(RatedSeriesDetails.rating);

    const handleChange = e => {
        const newValue = e.target.value;

        if (/^\d{0,2}(\.\d?)?$/.test(newValue)) {
            const num = parseFloat(newValue);
            if (isNaN(num) || num <= 10) {
                setValue(newValue);
            }
        }
    };

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
        if (value === "") {
            setValue("");
        } else {
            Swal.fire({
                icon: "success",
                theme: "dark",
                title: "Success!",
                text: "Your rating has been submitted successfully.",
                confirmButtonColor: "#ef4444"
            });

            console.log("Rating submitted:", value);
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
                    dispatch(
                        AddSeriesRating({
                            seriesId: localStorage.getItem("seriesId"),
                            sessionId: localStorage.getItem("sessionId"),
                            rate: value
                        })
                    );
                    handleSubmit();
                }}
                as="div"
                size="sm"
                className="cursor-pointer hover:bg-red-800 rounded-lg bg-red-600 px-3 py-2 flex items-center justify-center shadow-sm hover:shadow-red-500/30 transition-all">
                <RiSendPlaneFill size={16} />
            </Typography>
        </div>
    );
};

export default UserRateSection;
