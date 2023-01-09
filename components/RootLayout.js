import Image from "next/image"
import bg from "../public/bg.svg"
export const RootLayout = ({children}) => {
  return (
    <div className="max-w-[400px]">
    <Image
    src={bg}
    alt="background"
    className="absolute opacity-70 -top-7 -z-10"
    />
    {children}
    </div>
  )
}