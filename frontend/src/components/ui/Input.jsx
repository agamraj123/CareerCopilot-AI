import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder,
      error,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            text-slate-900
            outline-none
            transition-all
            duration-200
            placeholder:text-slate-400
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                : ""
            }
            ${className}
          `}
          {...props}
        />

        {error && (
          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;