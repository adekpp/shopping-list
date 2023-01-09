import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "next/link";
export default function BackButton() {
  const router = useRouter();
  return router.pathname === "/" ? null : (
    <Link href="/">
      <IoArrowBack className="fixed top-[13px] left-[19px] text-grey w-7 h-7" />
    </Link>
  );
}
