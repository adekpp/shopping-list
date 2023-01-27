import Image from "next/image";
import bg from "../public/bg.svg";
import { useSession } from "next-auth/react";
export const RootLayout = ({ children }) => {
  const { status } = useSession();
  return (
    <div
      className={`max-w-[500px] min-h-screen text-grey mx-auto pb-6 ${
        status !== "authenticated" && "bg-yellow"
      }`}
    >
      {status === "authenticated" && (
        <Image
          src={bg}
          alt="background"
          className="absolute opacity-70 -top-7 -z-10"
        />
      )}
      {children}
    </div>
  );
};
