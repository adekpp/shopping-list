import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "next/link";
export default function BackButton() {
  const router = useRouter();
  return router.pathname === "/" ? null : (
    <button>
      <Link href="/">
        <IoArrowBack className=" text-grey w-7 h-7 active:scale-75" />
      </Link>
    </button>
  );
}
