import React from "react";
import { useSelector } from "react-redux";

const ProductionCompaniesSection = () => {
    const { selectedSeriesDetails, detailsLoading, detailsError } = useSelector(
        state => state.seriesDetailsReducer
    );
    return (
        <section className="max-w-6xl mx-auto px-6 pb-10">
            <h2 className="text-2xl font-bold mb-4 text-red-500">
                Production Companies
            </h2>
            <div className="flex gap-6 overflow-x-auto scroll-indicator pb-4">
                {selectedSeriesDetails?.production_companies.length > 0 ? (
                    <>
                        {selectedSeriesDetails?.production_companies?.map(
                            comp => (
                                <div
                                    key={comp.id}
                                    className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-[#0f0f0f] px-4 py-3 rounded-xl border border-gray-800 transition">
                                    {comp.logo_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${comp.logo_path}`}
                                            alt={comp.name}
                                            className="h-14 w-auto max-w-[150px] object-contain"
                                        />
                                    ) : (
                                        <p className="text-gray-400 text-center text-sm">
                                            {comp.name}
                                        </p>
                                    )}
                                </div>
                            )
                        )}
                    </>
                ) : (
                    <>
                        <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-10">
                            <p className="text-gray-400 text-lg font-medium">
                                ❌ No Production Companies available for this
                                series.
                            </p>
                            <p className="text-gray-600 text-sm mt-2">
                                This series doesn’t have any Production
                                Companies information.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default ProductionCompaniesSection;
