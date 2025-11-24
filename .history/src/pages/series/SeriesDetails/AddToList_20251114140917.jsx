import { Button } from "@material-tailwind/react";
import { FaList } from "react-icons/fa";
import { motion } from "framer-motion";

const AddToList = ({ onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center">
            <Button
                onClick={onClick}
                className="bg-black/30 p-2 rounded-xl border border-red-600 shadow-md hover:shadow-red-500/20 transition-all flex items-center justify-center">
                <FaList className="text-red-500 text-xl" />
            </Button>
        </motion.div>
    );
};

export default AddToList;
