import { CheckCircle } from "lucide-react";

const SuggestionChip = ({ text }) => {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        bg-white
        border
        border-blue-200
        px-4
        py-2
        text-sm
        font-medium
        text-slate-700
        transition-all
        duration-300
        hover:shadow-md
        hover:-translate-y-0.5
      "
    >
      <CheckCircle
        size={16}
        className="text-green-500"
      />

      {text}
    </div>
  );
};

export default SuggestionChip;