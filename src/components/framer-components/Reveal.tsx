import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

type RevealProps = {
  children: JSX.Element;
  width?: "fit-content" | "100%";
};

const Reveal: React.FC<RevealProps> = ({ children, width = "fit-content" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible")
    }
  }, [isInView]);

  return (
    <div className="relative overflow-hidden" style={{ width }} ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{ hidden: { left: 0 }, visible: { left: "100%" } }}
        initial={"hidden"}
        animate={slideControls}
        transition={{ duration: 0.4, ease: "easeIn" }}
        className="absolute top-1 bottom-2 left-0 right-0 bg-main z-20 rounded-md"
      ></motion.div>
    </div>
  );
};
export default Reveal;
