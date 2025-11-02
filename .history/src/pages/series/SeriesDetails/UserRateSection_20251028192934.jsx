import React from "react";
import { Card } from "@material-tailwind/react";
import { Input, Button } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";

const UserRateSection = () => {
    return (
        <Card className="bg-[#0f0f0f] border border-red-600/30 p-4 rounded-2xl w-fit flex items-center gap-3 shadow-md">
            <FaStar className="text-red-500 text-lg" />
            <div className="flex items-center gap-2">
                <span className="text-gray-200 text-sm font-medium">
                    Add Rate
                </span>
                <Input
                    type="number"
                    step="0.5"
                    min="0"
                    max="10"
                    placeholder="0 - 10"
                    className="!w-20 !text-center !text-gray-100 !border-red-600/50 focus:!border-red-500 focus:!ring-0 !bg-transparent"
                    labelProps={{ className: "hidden" }}
                />
                <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium">
                    Submit
                </Button>
            </div>
        </Card>
    );
};

export default UserRateSection;
