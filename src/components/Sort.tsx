import { cn } from "@/lib/utils";
import type { FC } from "react";

interface Props {
  order: "asc" | "desc";
  isActive: boolean;
  onClick: () => void;
}

export const Sort: FC<Props> = ({ order, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn("inline cursor-pointer", isActive && "text-[#3c538e]")}
    >
      {order === "asc" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="inline ml-1 lucide lucide-arrow-down-narrow-wide-icon lucide-arrow-down-narrow-wide"
        >
          <path d="m3 16 4 4 4-4" />
          <path d="M7 20V4" />
          <path d="M11 4h4" />
          <path d="M11 8h7" />
          <path d="M11 12h10" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="inline ml-1 lucide lucide-arrow-up-narrow-wide-icon lucide-arrow-up-narrow-wide"
        >
          <path d="m3 8 4-4 4 4" />
          <path d="M7 4v16" />
          <path d="M11 12h4" />
          <path d="M11 16h7" />
          <path d="M11 20h10" />
        </svg>
      )}
    </div>
  );
};
