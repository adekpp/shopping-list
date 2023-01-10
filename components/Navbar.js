import Link from "next/link";
import LoginButton from "@/components/LoginButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import BackButton from "./BackButton";
import Image from "next/image";
import { motion } from "framer-motion";
export const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <div className="flex w-full flex-row">
        <div className="w-full pl-4 pt-4">
          <BackButton />
        </div>
        <div className="w-full pr-4 pt-4 z-10">
          <LoginButton />
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
