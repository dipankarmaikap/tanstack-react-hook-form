import React from "react";
import type {
  FieldErrors,
  Path,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import type { ValidationResponse } from "~/lib/form-helper";
import clsx from "clsx";

interface InputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  flashData: ValidationResponse<T> | null;
}
export default function Input<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  flashData,
  ...rest
}: InputProps<T>) {
  const haveErrors = flashData?.success === false;
  const showError = errors?.[name] || haveErrors;
  return (
    <div className={"from-input " + name}>
      <label className="flex mb-1.5 font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        className={clsx(
          "input flex w-full ring ring-neutral-400  focus:outline-none rounded-xs p-2",
          {
            "ring-red-600": showError,
            "focus:ring-blue-600": !showError,
          }
        )}
        id={name as string}
        defaultValue={flashData?.data?.[name]}
        {...register(name)}
        {...rest}
      />
      <span
        className={clsx("text-red-600 flex text-sm mt-0.5", {
          hidden: !showError,
        })}
      >
        {haveErrors
          ? flashData?.errors?.[name]
          : errors?.[name]?.message?.toString()}
      </span>
    </div>
  );
}
