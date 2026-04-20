import { cn } from "@/lib/utils";
import type { FC } from "react";

interface Props {
  classname?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export const Checkbox: FC<Props> = ({
  classname = "",
  checked,
  onChange,
  label,
}) => {
  return (
    <div className="flex gap-2.5 items-center my-1">
      <input
        className={cn(
          "size-6 cursor-pointer appearance-none checked:appearance-auto border-2 rounded-md outline-none border-[#EDEDED] ",
          classname,
        )}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      {label && <span className="font-medium text-[#9C9C9C] ">{label}</span>}
    </div>
  );
};
