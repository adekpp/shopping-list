import { signIn, useSession } from "next-auth/react";
import BackButton from "./BackButton";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import UserMenu from "@/components/UserMenu";

export const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <div className="flex w-full flex-row">
        <div className="w-full pl-4 pt-4">
          <BackButton />
        </div>
        <div className="flex w-full pr-4 pt-4 z-10 place-content-end">
          {status === "authenticated" && <UserMenu />}

          {status === "unauthenticated" && (
            <Button intent="primary" onClick={() => signIn("google")}>
              Zaloguj się
            </Button>
          )}
        </div>
      </div>

      <div className=" relative flex flex-col place-content-between  items-center   w-full mb-4 tracking-wider  text-xl">
        {status === "authenticated" ? (
          <>
            <motion.div
              initial={{ opacity: "0%", scale: "0%" }}
              animate={{ opacity: "100%", scale: "100%" }}
              transition={{ duration: 0.6, repeat: false }}
              className="flex flex-row items-baseline gap-x-1  text-grey"
            >
              <h1>Cześć,</h1>
              <p className="font-semibold">{session.user.name.split(" ")[0]}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: "0%", x: "-80px", rotate: 0 }}
              animate={{ opacity: "100%", x: "0px", rotate: 360 }}
              transition={{ duration: 0.8, repeat: false }}
              className="max-w-[62px] w-full mt-3"
            >
              <Image
                src={session.user.image}
                alt="Profile image"
                width={100}
                height={100}
                className="rounded-full drop-shadow-md"
              />
            </motion.div>
          </>
        ) : null}
      </div>
    </>
  );
};
