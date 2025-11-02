import React from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import { FaStar, FaChevronUp, FaChevronDown } from "react-icons/fa";

const UserRateSection = () => {
    return (
        <div className="w-full flex justify-center mt-16">
            <Card className="bg-[#0f0f0f] border border-red-600/30 rounded-2xl shadow-xl p-8 max-w-lg w-full flex flex-col items-center text-center">
                {/* Title */}
                <Typography
                    variant="h4"
                    className="text-transparent bg-gradient-to-r from-red-600 to-red-400 bg-clip-text font-bold mb-2">
                    Rate This Series
                </Typography>

                <Typography className="text-gray-400 text-sm mb-6">
                    Click to increase or decrease your rating
                </Typography>

                {/* Rating Controls */}
                <div className="flex items-center justify-center gap-6">
                    {/* Down Button */}
                    <Button
                        color="gray"
                        variant="outlined"
                        className="rounded-full p-4 border-gray-600 hover:border-red-500 hover:text-red-500 transition-all duration-300">
                        <FaChevronDown size={18} />
                    </Button>

                    {/* Rating Display */}
                    <div className="flex items-center justify-center gap-2 bg-black border border-red-600/40 rounded-xl px-6 py-3">
                        <FaStar className="text-red-500 text-xl" />
                        <Typography
                            variant="h5"
                            className="text-red-500 font-semibold tracking-wide">
                            8.5
                        </Typography>
                    </div>

                    {/* Up Button */}
                    <Button
                        color="gray"
                        variant="outlined"
                        className="rounded-full p-4 border-gray-600 hover:border-red-500 hover:text-red-500 transition-all duration-300">
                        <FaChevronUp size={18} />
                    </Button>
                </div>

                <Typography className="text-gray-500 text-xs mt-4 italic">
                    *Each click changes the rating by 0.5
                </Typography>
            </Card>
        </div>
    );
};

export default UserRateSection;
