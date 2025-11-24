import { Button } from "@material-tailwind/react";
import { FaList } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { GetLists } from "../../../redux/SharedSlices/GetRequest/Lists";

const AddToList = () => {
    const dispatch = useDispatch();
    const { AccountInfoDetails, isLogged } = useSelector(
        state => state.AccountInfoSliceReducer
    );
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center">
            <Button
                onClick={() => {
                    dispatch(
                        GetLists({
                            page: 1,
                            accountId: AccountInfoDetails?.id,
                            sessionId: localStorage.getItem("sessionId")
                        })
                    );
                }}
                className="bg-black/30 p-2 rounded-xl border border-red-600 shadow-md hover:shadow-red-500/20 transition-all flex items-center justify-center">
                <FaList className="text-red-500 text-xl" />
            </Button>
        </motion.div>
    );
};

export default AddToList;
