import { useSession } from "next-auth/react";
import { Loader } from "./Loader";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

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
        className="flex flex-col w-full items-center mt-14"
      >
        <h1 className="text-grey text-2xl font-semibold">Shopping list</h1>
        <p className="text-grey text-xs italic">Nie jesteś zalogowany</p>
      </motion.div>
    );
  }
  if (status === "authenticated") {
    return <main className="px-3">{children}</main>;
  }
}
