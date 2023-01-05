import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext} from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ModalContext } from "../context/ModalContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteList = async (id) => {
  try {
    const res = await fetch(`/api/lists?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

export const ListMenu = () => {
  const queryClient = useQueryClient();
  const { mutate: remove } = useMutation(deleteList, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const { openListEditModal, data } = useContext(ModalContext);

  return (
    <>
      <div className="absolute top-[10px] right-[10px] text-right">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="text-gray-400 active:scale-90">
              <BsThreeDotsVertical />
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
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={openListEditModal}
                      className={`${
                        active ? "bg-blue-600 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <AiFillEdit className="w-[20px] h-[20px] mr-3 text-gray-400" />
                      Zmień nazwę
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => remove(data.id)}
                      className={`${
                        active ? "bg-blue-600 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <AiFillDelete className="w-[20px] h-[20px] mr-3 text-gray-400" />
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
