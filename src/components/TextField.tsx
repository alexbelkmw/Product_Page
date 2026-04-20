import { cn } from "@/lib/utils";
import { useState, type FC, type ReactNode } from "react";

interface Props {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  icon?: ReactNode;
  onClear?: () => void;
  hiddenField?: boolean;
  errorMsg?: string;
  labelClassName?: string;
  fieldClassName?: string;
  inputClassName?: string;
  placenolder?: string;
}

export const TextField: FC<Props> = ({
  label,
  value,
  onChange,
  icon,
  onClear,
  hiddenField,
  errorMsg,
  labelClassName,
  fieldClassName,
  inputClassName,
  placenolder,
}) => {
  const [hidden, setHidden] = useState(hiddenField);

  return (
    <div className="w-full">
      {label && (
        <div
          className={cn(
            "font-medium text-lg tracking-[-0.015em] pb-0.75 h-6.75 flex items-center mb-1.5 ",
            labelClassName,
          )}
        >
          {label}
        </div>
      )}
      <div
        style={{ borderColor: errorMsg ? "red" : "" }}
        className={cn(
          "flex items-center py-3.5 px-4 border-[1.5px] border-[#EDEDED] rounded-xl ",
          fieldClassName,
        )}
      >
        {icon ? <img src="/user.svg" /> : null}
        <input
          type={hidden ? "password" : "text"}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placenolder}
          className={cn(
            "outline-hidden font-medium text-lg tracking-[-0.015em] text-[#232323] h-6 flex grow items-center px-3.5 ",
            inputClassName,
          )}
        />
        <button
          onClick={() => {
            if (hiddenField) {
              setHidden(!hidden);
            } else {
              onChange?.("");
              onClear?.();
            }
          }}
          className="cursor-pointer outline-hidden "
        >
          {hiddenField ? <img src="/eye.svg" /> : <img src="/clear.svg" />}
        </button>
      </div>
      {errorMsg && (
        <div className="text-red-500 text-xs leading-0 pt-1.5 pl-2">
          {errorMsg}
        </div>
      )}
    </div>
  );
};
