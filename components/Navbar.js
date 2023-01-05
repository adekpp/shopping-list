import Link from "next/link";
import LoginButton from "@/components/LoginButton"

export const Navbar = () => {
  return (
    <div className="flex flex-row place-content-between p-2 items-center bg-blue-500 w-full max-w-full mb-4">
      <Link href="/">
        <h1 className="text-white font-semibold">Shopping list</h1>
      </Link>
      <LoginButton />
      
    </div>
  );
};
