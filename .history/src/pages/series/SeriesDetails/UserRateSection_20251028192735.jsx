import React from "react";
import { Input } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";

const UserRateSection = () => {
    return (
        <div className="flex items-center gap-3 mt-4">
            <FaStar className="text-red-500 text-lg" />
            <Input
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="Rate (0 - 10)"
                className="!bg-transparent !border !border-red-600/40 text-red-500 placeholder:text-gray-500 w-24 text-center"
                labelProps={{ className: "hidden" }}
            />
        </div>
    );
};

export default UserRateSection;
