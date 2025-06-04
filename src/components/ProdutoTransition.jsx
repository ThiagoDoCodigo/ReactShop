import { motion } from "framer-motion";
import PropTypes from "prop-types";

const pageVariants = {
  initial: { x: "+100vw" },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { x: "+100vw", transition: { duration: 0.5 } },
};

const ProdutoTransition = ({ children }) => {
  motion;
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

ProdutoTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProdutoTransition;
