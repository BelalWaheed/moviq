import { motion } from "framer-motion";

const CreateListModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-[#111] w-full max-w-md rounded-2xl p-6 border border-white/10 shadow-xl relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-300 hover:text-white">
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-red-500 mb-6">
                    Create New List
                </h2>

                <div className="space-y-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300">List Name</label>
                        <input
                            type="text"
                            placeholder="My awesome list"
                            className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-red-600 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300">Description</label>
                        <textarea
                            rows={4}
                            placeholder="List description..."
                            className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-red-600 outline-none resize-none"></textarea>
                    </div>

                    <button className="w-full mt-4 bg-red-600 hover:bg-red-700 py-3 rounded-xl text-lg font-semibold shadow-md shadow-red-500/30 transition">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateListModal;
