const SectionTitle = ({
  badge,
  title,
  description,
}) => {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {badge && (
        <p className="mb-3 font-semibold text-blue-600">
          {badge}
        </p>
      )}

      <h2 className="font-bold text-slate-900 text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-lg leading-8 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;