import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700",

  secondary:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",

  success:
    "bg-green-600 text-white hover:bg-green-700",

  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  sm: "px-4 py-2 text-sm",

  md: "px-6 py-3 text-base",

  lg: "px-8 py-4 text-lg",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className={`
        rounded-xl
        font-semibold
        transition-all
        duration-300
        shadow-sm
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;