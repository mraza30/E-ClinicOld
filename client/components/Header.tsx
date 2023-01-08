import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  return (
    <motion.div
      initial={{ x: -150 }}
      animate={{ x: 0 }}
      exit={{ x: -150 }}
      transition={{ duration: 1 }}
      className="fixed z-50 h-screen w-28 bg-sky-500"
    ></motion.div>
  );
}

export default function Header() {
  function isWindowWidthMd() {
    return window.innerWidth >= 768;
  }

  function setNavStates() {
    setShowNavbar(isWindowWidthMd());
    setShowNavIcon(!isWindowWidthMd());
  }

  const [showNavbar, setShowNavbar] = useState(false);

  const [showNavIcon, setShowNavIcon] = useState(false);

  useEffect(() => {
    setNavStates();
    window.addEventListener("resize", setNavStates);
    return () => {
      window.removeEventListener("resize", setNavStates);
    };
  }, []);

  return (
    <>
      <AnimatePresence>{showNavbar && <Navbar />}</AnimatePresence>
      {showNavIcon && (
        <FontAwesomeIcon
          icon={showNavbar ? faClose : faBars}
          className="absolute right-4 top-4 z-50"
          size="xl"
          onClick={() => setShowNavbar((prev) => !prev)}
        />
      )}
    </>
  );
}
