import { motion } from "framer-motion";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
      group
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-8
      shadow-sm
      transition-all
      duration-300
      hover:border-blue-200
      hover:shadow-xl
    "
    >
      <div
        className="
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-br
        from-blue-500
        to-indigo-600
        text-white
      "
      >
        <Icon size={30} />
      </div>

      <h3 className="mt-8 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-4 leading-8 text-slate-500">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;