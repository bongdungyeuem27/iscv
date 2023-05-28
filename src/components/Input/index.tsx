import React from "react";
import clsx from "clsx";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
};

const Input = (props: Props) => {
  return (
    <input
      className={clsx(
        props.className,
        "focus:outline-pink-300 rounded-xl bg-white"
      )}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    ></input>
  );
};

export default Input;
