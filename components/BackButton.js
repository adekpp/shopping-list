import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "next/link";
export default function BackButton({ session }) {
  const router = useRouter();
  return (router.pathname === "/") | !session ? null : (
    <button className=" border-[1px] border-grey rounded-full p-1  border-opacity-0 active:border-opacity-25 active:border-grey">
      <Link href="/">
        <IoArrowBack className=" text-grey w-7 h-7 active:scale-75" />
      </Link>
    </button>
  );
}
