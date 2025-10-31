import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";

const UserRateSection = () => {
    const [value, setValue] = useState("");

    return (
        <div className="flex items-center gap-3 bg-black px-4 py-3 rounded-2xl border border-gray-800 w-fit shadow-md hover:shadow-lg transition-all duration-200">
            <FaStar className="text-yellow-400 text-2xl drop-shadow-[0_0_5px_rgba(255,215,0,0.4)]" />
            <span className="text-gray-100 text-sm font-semibold tracking-wide">
                Add Rate
            </span>

            <Input
                type="number"
                step="0.5"
                min="0"
                max="10"
                value={value}
                onChange={e => setValue(e.target.value)}
                className="!text-white !text-sm !w-20 !h-9 !border-gray-700 focus:!border-red-500 transition-all"
                containerProps={{ className: "!min-w-0" }}
                labelProps={{ className: "hidden" }}
                placeholder="0–10"
            />

            <Button
                size="sm"
                color="red"
                className="rounded-lg px-3 py-2 flex items-center justify-center shadow-sm hover:shadow-red-500/30 transition-all">
                <RiSendPlaneFill size={16} />
            </Button>
        </div>
    );
};

export default UserRateSection;
