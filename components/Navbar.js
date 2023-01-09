import Link from "next/link";
import LoginButton from "@/components/LoginButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import BackButton from "./BackButton";
export const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <BackButton />
      <LoginButton />

      <div className=" relative flex flex-col place-content-between py-4 items-center   w-full mb-4 tracking-wider mt-8 text-xl">
        {status === "authenticated" ? (
          <>
            <div className="flex flex-row items-baseline gap-x-1  text-grey">
              <h1>Cześć,</h1>
              <p className="font-semibold">{session.user.name.split(" ")[0]}</p>
            </div>
            <div className="max-w-[48px] w-full mt-3">
              <img className="rounded-full drop-shadow-md" src={session.user.image} />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
