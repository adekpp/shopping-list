import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ModalContext } from "../context/ModalContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteList } from "utils/api";
import useDeleteList from "hooks/useDeleteList";

export const ListMenu = ({ user, list }) => {
  const { remove } = useDeleteList();
  const { openListEditModal, editList } = useContext(ModalContext);
  return (
    <>
      <div className="absolute top-[10px] right-[10px] text-right">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="text-grey active:scale-90  px-2 py-2">
              <BsThreeDotsVertical className=" text-grey" />
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
            <Menu.Items className="absolute right-0 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg border-[1px] border-grey focus:outline-none z-10">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        editList(list);
                        openListEditModal();
                      }}
                      className=" text-grey
                       group flex w-full items-center rounded-md px-2 py-2 text-sm"
                    >
                      <AiFillEdit className="w-[20px] h-[20px] mr-3" />
                      Zmień nazwę
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        remove({ id: list.id, email: user.email });
                      }}
                      className=" text-grey
                       group flex w-full items-center rounded-md px-2 py-2 text-sm"
                    >
                      <AiFillDelete className="w-[20px] h-[20px] mr-3" />
                      Usuń
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};
