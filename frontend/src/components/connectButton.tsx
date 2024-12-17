

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';

const itemVariants: Variants = {
     open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 }
  }
};


function ConnectButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("accept");

  const handleAcceptClick = () => {
    setIsOpen(true);
    setStatus("accepted");
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className=""
    >
      <motion.button
        className="text-white m-3 px-9 py-2 xl:h-12 xl:px-14 2xl:py-1 font-semibold rounded-2xl bg-[#5E97A9]"
        whileTap={{ scale: 0.97 }}

        onClick={handleAcceptClick}
      >
        {status === "accept" ? "Accept" : "Freinds"}
      </motion.button>
      <motion.div
        className=""
        variants={{
            open: {
                clipPath: "inset(0% 0% 0% 0% round 10px)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.7,
                  delayChildren: 0.3,
                  staggerChildren: 0.05
                }
              },          closed: { clipPath: "inset(10% 50% 90% 50% round 10px)", transition: { duration: 0.3 } }
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <motion.button
            whileTap={{ scale: 0.97 }}
          className="bg-[#1D1E22] text-white  px-9 py-2 xl:h-12 xl:px-10 2xl:py-1 font-semibold rounded-2xl"
          variants={itemVariants}
        >
          {status === "accept" ? "Send Message" : "Send Message"}
        </motion.button>
      </motion.div>
    </motion.nav>
  );
}

export default ConnectButton;
