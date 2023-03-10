import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSession, signOut } from "next-auth/react";
import { HiMenuAlt3 } from "react-icons/hi";
export default function UserMenu() {
  const { data: session, status } = useSession();
  return (
    <div className=" text-right z-10 ">
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button className="inline-flex w-full h-full justify-center  text-sm font-medium text-white active:scale-75  border-[1px] border-grey rounded-full p-2  border-opacity-0 active:border-opacity-25 active:border-grey">
            <HiMenuAlt3 className="w-7 h-7 text-grey" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0  w-56 origin-top-right divide-y divide-grey rounded-md bg-white shadow-lg">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <p className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold text-current">
                  {session.user.email}
                </p>
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={`${
                      active ? "bg-gray-200 " : "text-red"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red`}
                  >
                    Wyloguj się
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
