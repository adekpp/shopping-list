import { cva } from "class-variance-authority";
import { useEffect, useRef } from "react";

const inputStyles = cva(" px-2 outline-none rounded-md drop-shadow-md", {
  variants: {
    intent: {
      primary: "border-[1px] border-grey  py-1",
      secondary: "border-none py-2",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

const TextInput = ({ intent, fullWidth, children, ...props }, focused) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (focused === "true" && inputRef) {
      const input = inputRef.current;
      input.focus();
    }
  });
  return (
    <input
      focused={focused}
      ref={inputRef}
      type="text"
      className={inputStyles({ fullWidth, intent })}
      {...props}
    />
  );
};

export default TextInput;
