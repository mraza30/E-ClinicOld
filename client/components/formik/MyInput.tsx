import clsx from "clsx";
import { useField } from "formik";
import { useRef, useState } from "react";

import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MyInput({ label, type, ...rest }: any) {
  const [showPassword, setShowPassword] = useState(false);

  const [{ onBlur, ...formik }, meta] = useField(rest);

  const [isFocus, setIsFocus] = useState(false);

  const isPassword = useRef(type === "password");

  return (
    <div
      className={clsx({
        "relative flex flex-col rounded-2xl border-4 bg-zinc-600 py-2 px-4":
          true,
        "border-blue-600": isFocus,
        "border-red-600": meta.touched && meta.error,
      })}
    >
      <label className="text-sm text-zinc-300" htmlFor={rest.id || rest.name}>
        {label}
      </label>
      <input
        onFocus={() => setIsFocus(true)}
        onBlur={(e) => {
          onBlur(e);
          setIsFocus(false);
        }}
        type={!isPassword ? type : !showPassword ? "password" : "text"}
        className="bg-transparent font-semibold text-white outline-none"
        {...formik}
        {...rest}
      />
      {meta.touched && meta.error ? (
        <div className="capitalize text-red-400">{meta.error}</div>
      ) : null}
      {isPassword.current ? (
        <FontAwesomeIcon
          icon={faEye}
          className="absolute top-4 right-4 text-white"
          size="xl"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        />
      ) : null}
    </div>
  );
}
