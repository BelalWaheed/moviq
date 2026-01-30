import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CreateList } from "../../redux/SharedSlices/PostRequest/List/CreateList";

const MovieCreateListModal = ({
    onClose,
    onSubmit,
    setOpenLists,
    setOpenCreate
}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    // Regex: only letters, numbers, spaces, dash, underscore, 1-50 chars
    const nameRegex = /^[a-zA-Z0-9 _-]{1,50}$/;

    const handleSubmit = () => {
        if (!nameRegex.test(name.trim())) {
            setError(
                "Name must be 1-50 characters, letters, numbers, spaces, - or _ only."
            );
        } else {
            setError("");
            dispatch(
                CreateList({
                    name: name.trim(),
                    description,
                    sessionId: localStorage.getItem("sessionId")
                })
            ).then(() => {
                setOpenLists(true), setOpenCreate(false);
            });
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-[#0f0f0f] w-full max-w-md mx-4 p-6 rounded-3xl shadow-2xl border border-white/5 font-sans z-50 bg-black/60 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">
                        Create New List
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            List Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="e.g., Favorites, Watch Later..."
                            className={`w-full px-4 py-3 bg-white/[0.02] border rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors text-sm ${
                                error ? "border-red-500" : "border-white/10"
                            }`}
                        />
                        {error && (
                            <p className="text-red-500 text-xs mt-1 font-medium">
                                {error}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Optional description for your list..."
                            rows={3}
                            className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors text-sm resize-none"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!name.trim()}
                        className="w-full mt-2 px-4 py-3 text-sm font-medium text-white bg-white/5 hover:bg-white/10 disabled:bg-white/[0.02] disabled:text-gray-600 disabled:cursor-not-allowed rounded-2xl transition-colors border border-white/10 disabled:border-white/5">
                        Create List
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default MovieCreateListModal;
