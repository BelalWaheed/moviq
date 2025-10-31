import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";

const UserRateSection = () => {
    const [value, setValue] = useState(0);

    const handleChange = e => {
        const newValue = e.target.value;
        if (!isNaN(newValue) && newValue >= 0 && newValue <= 10) {
            setValue(newValue);
        }
    };

    return (
        <div className="flex items-center gap-3 bg-black/90 px-4 py-3 rounded-2xl border border-gray-900 w-fit shadow-md hover:shadow-lg transition-all duration-200">
            <FaStar className="text-yellow-400 text-2xl drop-shadow-[0_0_5px_rgba(255,215,0,0.4)]" />
            <span className="text-gray-100 text-sm font-semibold tracking-wide">
                Add Rate
            </span>

            <input
                type="number"
                step="0.5"
                min="0"
                max="10"
                value={value}
                onChange={handleChange}
                onKeyDown={e => e.preventDefault()}
                className="w-16 h-9 text-white text-center text-sm rounded-lg border border-gray-900 outline-none bg-transparent transition-all focus:border-red-500 
                [&::-webkit-inner-spin-button]:bg-transparent 
                [&::-webkit-outer-spin-button]:bg-transparent"
            />

            <Typography
                as="div"
                size="sm"
                className="cursor-pointer hover:bg-red-800 rounded-lg bg-red-600 px-3 py-2 flex items-center justify-center shadow-sm hover:shadow-red-500/30 transition-all">
                <RiSendPlaneFill size={16} />
            </Typography>
        </div>
    );
};

export default UserRateSection;
