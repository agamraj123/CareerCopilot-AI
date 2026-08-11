const HeroBackground = () => {
  return (
    <>
      {/* Blue Blob */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl" />

      {/* Purple Blob */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-indigo-400/20 blur-3xl" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#000 1px, transparent 1px),
            linear-gradient(90deg,#000 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </>
  );
};

export default HeroBackground;