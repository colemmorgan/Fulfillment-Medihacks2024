import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

type StaggeredFadeUpProps = {
  children: JSX.Element;
  index: number;
};

const StaggeredFadeUp: React.FC<StaggeredFadeUpProps> = ({
  children,
  index,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.13 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      initial={"hidden"}
      animate={mainControls}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: 0.1 * index,
      }}
     
    >
      {children}
    </motion.div>
  );
};
export default StaggeredFadeUp;
