import { useSession } from "next-auth/react";
import { Loader } from "./ui/Loader";
import { motion } from "framer-motion";
import logo from "../public/logo.png"
import Image from "next/image";
export default function Layout({ children }) {
  const { status } = useSession();


  if (status === "loading") {
    return (
      <div className="flex w-full place-content-center mt-16">
        <Loader />
      </div>
    );
  }
  if (status === "unauthenticated") {
    return (
      <motion.div
        initial={{ opacity: "0%", scale: "0%" }}
        animate={{ opacity: "100%", scale: "100%" }}
        transition={{ duration: 0.6, repeat: false }}
        className="flex flex-col w-full items-center mt-10 "
      >
        <Image
        src={logo}
        alt="Logo"
        width={250}

         />
        <p className="text-grey text-xs italic">Nie jesteś zalogowany</p>
      </motion.div>
    );
  }
  if (status === "authenticated") {
    return <main className="px-3">{children}</main>;
  }
}
