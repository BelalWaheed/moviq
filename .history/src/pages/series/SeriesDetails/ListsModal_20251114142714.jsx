import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";

const ListsModal = ({ lists, onClose, onCreate }) => (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#0f0f0f] w-full max-w-md p-6 rounded-2xl shadow-xl border border-white/10 font-poppins">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-red-500">Your Lists</h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white font-bold">
                    ✕
                </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
                {lists.length === 0 ? (
                    <p className="text-gray-400 text-center py-6">
                        No lists found.
                    </p>
                ) : (
                    lists.map((list, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="flex justify-between items-center bg-[#1a1a1a] px-4 py-3 rounded-xl border border-white/10 transition cursor-pointer">
                            <div>
                                <h3 className="text-red-400 font-semibold">
                                    {list.name}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {list.description}
                                </p>
                            </div>
                            <Button
                                size="sm"
                                color="red"
                                className="px-3 py-1 text-sm rounded-xl">
                                Add
                            </Button>
                        </motion.div>
                    ))
                )}
            </div>

            <Button
                fullWidth
                color="red"
                className="mt-5 rounded-xl"
                onClick={onCreate}>
                Create New List
            </Button>
        </motion.div>
    </div>
);

export default ListsModal;
