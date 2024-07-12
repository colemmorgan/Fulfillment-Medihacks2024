import React from 'react';
import { motion, AnimatePresence } from "framer-motion";

type SmoothOpenProps = {
    children: JSX.Element;
    isHidden: boolean
};

const SmoothOpen:React.FC<SmoothOpenProps> = ({children, isHidden}) => {
    
    return (
        <AnimatePresence initial={false}>
            {!isHidden && 
            <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease:"easeInOut" }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>}
        </AnimatePresence>
    )
}
export default SmoothOpen;