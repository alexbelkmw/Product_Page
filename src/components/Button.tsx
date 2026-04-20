import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, FC } from "react";

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className = "",
  children,
  ...other
}) => {
  return (
    <button
      className={cn(
        "cursor-pointer w-full rounded-[40px] bg-local-blue border border-[#367AFF] tracking-[-0.01em] text-white font-semibold text-lg leading-1.2 ",
        className,
      )}
      {...other}
    >
      {children}
    </button>
  );
};
