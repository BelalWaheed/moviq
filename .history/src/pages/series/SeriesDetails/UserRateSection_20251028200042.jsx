import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";

const UserRateSection = () => {
    const [value, setValue] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = e => {
        const newValue = e.target.value;
        if (!isNaN(newValue) && newValue >= 0 && newValue <= 10) {
            setValue(newValue);
        }
    };

    return (
        <div className="flex items-center gap-3 bg-gradient-to-br from-zinc-900/95 via-zinc-900/90 to-black/95 backdrop-blur-sm px-5 py-3.5 rounded-xl border border-zinc-800/50 w-fit shadow-2xl hover:shadow-amber-500/5 hover:border-zinc-700/50 transition-all duration-300">
            {/* Star Icon with Glow */}
            <div className="relative">
                <FaStar className="text-amber-400 text-2xl drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)] transition-transform duration-200 hover:scale-110" />
                <div className="absolute inset-0 blur-md bg-amber-400/20 rounded-full"></div>
            </div>

            {/* Label */}
            <span className="text-zinc-200 text-sm font-medium tracking-wide uppercase text-xs">
                Your Rating
            </span>

            {/* Enhanced Input Container */}
            <div
                className={`relative transition-all duration-300 ${
                    isFocused ? "scale-105" : ""
                }`}>
                <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="10"
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={e => e.preventDefault()}
                    className={`w-16 h-10 text-white text-center text-lg font-bold rounded-lg border-2 outline-none bg-zinc-950/80 appearance-none transition-all duration-300 
                        ${
                            isFocused
                                ? "border-amber-500/80 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
                                : "border-zinc-800 hover:border-zinc-700"
                        }
                        focus:bg-zinc-900/90`}
                />
                {/* Accent line under input */}
                <div
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent transition-all duration-300 ${
                        isFocused ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}></div>
            </div>

            {/* Out of 10 indicator */}
            <span className="text-zinc-500 text-xs font-semibold">/10</span>

            {/* Submit Button */}
            <button className="group relative overflow-hidden cursor-pointer rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-4 py-2.5 flex items-center justify-center shadow-lg shadow-red-900/30 hover:shadow-red-600/40 transition-all duration-300 hover:scale-105 active:scale-95">
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-400/20 to-red-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <RiSendPlaneFill
                    className="text-white relative z-10"
                    size={18}
                />
            </button>
        </div>
    );
};

export default UserRateSection;
