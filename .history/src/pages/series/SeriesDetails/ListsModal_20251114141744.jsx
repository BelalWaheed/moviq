import { motion } from "framer-motion";

const ListsModal = ({ lists, onClose, onCreate }) => {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-[#111] w-full max-w-md rounded-2xl p-6 border border-white/10 shadow-xl relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-300 hover:text-white">
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-red-500 mb-5">
                    Your Lists
                </h2>

                {lists.length === 0 ? (
                    <p className="text-gray-400 text-center mb-6">
                        No lists found.
                    </p>
                ) : (
                    <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                        {lists.map((list, i) => (
                            <div
                                key={i}
                                className="bg-black/40 p-4 rounded-xl border border-white/10 hover:border-red-600 transition cursor-pointer">
                                <h3 className="text-lg font-semibold text-red-400">
                                    {list.name}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {list.description}
                                </p>

                                <button className="mt-3 bg-black/30 px-4 py-2 rounded-xl hover:bg-black/50 border border-red-600 text-red-400 text-sm transition">
                                    Add to this List
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={onCreate}
                    className="mt-6 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl text-lg font-semibold shadow-md shadow-red-500/30 transition">
                    Create New List
                </button>
            </div>
        </div>
    );
};

export default ListsModal;
