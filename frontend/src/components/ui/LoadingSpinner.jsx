import { Loader2 } from "lucide-react";

const LoadingSpinner = ({
  size = 24,
  text,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
    >
      <Loader2
        size={size}
        className="animate-spin text-blue-600"
      />

      {text && (
        <span className="text-slate-600 font-medium">
          {text}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;