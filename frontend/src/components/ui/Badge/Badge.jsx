const variants = {
  primary:
    "bg-blue-100 text-blue-700",

  success:
    "bg-green-100 text-green-700",

  warning:
    "bg-yellow-100 text-yellow-700",

  danger:
    "bg-red-100 text-red-700",
};

const Badge = ({
  children,
  variant = "primary",
  className = "",
}) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-4
        py-2
        text-sm
        font-semibold
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;