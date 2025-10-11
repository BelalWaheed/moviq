import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { MdFastRewind, MdFastForward } from "react-icons/md";
import { Button, Card } from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";
import { getSeries } from "../../redux/SeriesSlices/SeriesSlice";
import { useEffect } from "react";

const Pagination = () => {
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        dispatch(getSeries({ pageNumber: pageNumber }));
    }, [pageNumber]);

    return (
        <div
            className="flex justify-center items-center py-10 select-none
                fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-auto">
            <Card
                className="bg-[#0f0f0f] flex flex-row items-center justify-center gap-1 px-3 py-1
                   rounded-2xl shadow-lg transition-all duration-300 
                   hover:shadow-red-800/30">
                <Button
                    onClick={() =>
                        setPageNumber(
                            pageNumber - 10 <= 1 ? 1 : pageNumber - 10
                        )
                    }
                    disabled={pageNumber === 1}
                    color="red"
                    variant="text"
                    className="!p-2 sm:!p-3 rounded-full hover:bg-red-700/40 active:scale-90 
                     transition-all duration-200">
                    <MdFastRewind size={22} />
                </Button>

                <Button
                    onClick={() => setPageNumber(pageNumber - 1)}
                    disabled={pageNumber <= 1}
                    color="red"
                    variant="text"
                    className="!p-2 sm:!p-3 rounded-full hover:bg-red-700/40 active:scale-90 
                     transition-all duration-200">
                    <HiChevronLeft size={22} />
                </Button>

                <span
                    className="text-red-500 font-bold text-lg sm:text-md tracking-wide 
                     px-4 text-center   
                     shadow-inner">
                    {pageNumber}
                </span>

                <Button
                    onClick={() => setPageNumber(pageNumber + 1)}
                    disabled={pageNumber >= 500}
                    color="red"
                    variant="text"
                    className="!p-2 sm:!p-3 rounded-full hover:bg-red-700/40 active:scale-90 
                     transition-all duration-200">
                    <HiChevronRight size={22} />
                </Button>

                <Button
                    onClick={() =>
                        setPageNumber(
                            pageNumber + 10 >= 500 ? 500 : pageNumber + 10
                        )
                    }
                    disabled={pageNumber >= 500}
                    color="red"
                    variant="text"
                    className="!p-2 sm:!p-3 rounded-full hover:bg-red-700/40 active:scale-90 
                     transition-all duration-200">
                    <MdFastForward size={22} />
                </Button>
            </Card>
        </div>
    );
};

export default Pagination;
