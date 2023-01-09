import { useSession } from "next-auth/react";
import { Loader } from "./Loader";
import { useRouter } from "next/router";
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
      <div className="flex flex-col w-full items-center mt-10">
      <h1 className="text-grey text-2xl font-semibold">Shopping list</h1>
        <p className="text-grey text-xs italic">Nie jesteś zalogowany</p>
      </div>
    );
  }
  if (status === "authenticated") {
    return <main className="px-3">{children}</main>;
  }
}
