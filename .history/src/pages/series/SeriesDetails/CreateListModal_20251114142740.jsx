import { motion } from "framer-motion";
import { Button, Input, Textarea } from "@material-tailwind/react";

const CreateListModal = ({ onClose }) => (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#0f0f0f] w-full max-w-md p-6 rounded-2xl shadow-xl border border-white/10 font-poppins">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-red-500">
                    Create New List
                </h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white font-bold">
                    ✕
                </button>
            </div>

            <div className="space-y-4">
                <Input
                    label="List Name"
                    color="red"
                    size="md"
                    className="bg-[#1a1a1a]"
                />
                <Textarea
                    label="Description"
                    color="red"
                    size="md"
                    className="bg-[#1a1a1a]"
                />
                <Button fullWidth color="red" className="rounded-xl">
                    Confirm
                </Button>
            </div>
        </motion.div>
    </div>
);

export default CreateListModal;
