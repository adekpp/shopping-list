import { cva } from "class-variance-authority";

const buttonStyles = cva(
  "text-white active:scale-90 px-3 py-2 rounded-md drop-shadow-md font-semibold transition-all duration-75",
  {
    variants: {
      intent: {
        primary: "bg-gradient-to-r from-turquse to-seablue",
        secondary: "bg-white text-grey",
        warning: "bg-yellow text-white",
        fb: "bg-fbBlue text-white",
        disabled: "bg-gray-400"
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

export default function Button({ intent, fullWidth, children, ...props }) {
  return (
    <button className={buttonStyles({ intent, fullWidth })} {...props}>
      {children}
    </button>
  );
}
