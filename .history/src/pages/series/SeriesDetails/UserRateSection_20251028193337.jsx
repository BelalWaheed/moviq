import React, { useState } from "react";
import { Card } from "@material-tailwind/react";
import { Input, Button } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";

const UserRateSection = () => {
    const [value, setValue] = useState("");
    return (
        <div className="flex items-center gap-2 bg-black px-4 py-2 rounded-xl border border-gray-700 w-1/3">
            <FaStar className="text-yellow-400 text-xl" />
            <span className="text-gray-200 font-medium">Add Rate</span>
            <Input
                type="number"
                label="0–10"
                value={value}
                onChange={e => setValue(e.target.value)}
                className="!text-white !w-20"
                containerProps={{ className: "!min-w-0" }}
            />
            <Button size="sm" color="red" className="rounded-lg px-3">
                Submit
            </Button>
        </div>
    );
};

export default UserRateSection;
