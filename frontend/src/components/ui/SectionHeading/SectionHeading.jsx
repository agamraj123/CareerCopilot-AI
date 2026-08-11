const SectionHeading = ({
  badge,
  title,
  subtitle,
}) => {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {badge && (
        <Badge>{badge}</Badge>
      )}

      <h2 className="mt-6 text-4xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-4 text-lg text-slate-600">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeading;