import { signIn, useSession } from "next-auth/react";
import { Loader } from "./ui/Loader";
import { motion } from "framer-motion";
import logo from "../public/logo.png";
import Image from "next/image";
import Button from "./ui/Button";
export default function Layout({ children }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex w-full h-screen place-content-center items-center">
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
        className="flex flex-col w-full items-center "
      >
        <Image src={logo} alt="Logo" width={250} />
        <div className="flex w-full flex-col px-3 gap-y-2 mt-16">
        <p className="text-grey text-xl text-center">Zaloguj się za pomocą:</p>
          <Button intent="secondary" onClick={() => signIn("google")}>
            Google
          </Button>
          <Button intent="fb" onClick={() => signIn("facebook")}>
            Facebook
          </Button>
        </div>
      </motion.div>
    );
  }
  if (status === "authenticated") {
    return <main className="px-3">{children}</main>;
  }
}
