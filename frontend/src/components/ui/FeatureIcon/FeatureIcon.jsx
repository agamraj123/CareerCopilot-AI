const FeatureIcon = ({
  icon: Icon,
  className = "",
}) => {
  return (
    <div
      className={`
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-2xl
        bg-blue-600
        text-white
        shadow-md
        ${className}
      `}
    >
      <Icon size={30} />
    </div>
  );
};

export default FeatureIcon;