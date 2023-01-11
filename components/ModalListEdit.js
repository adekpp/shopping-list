import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "@/context/ModalContext";

export const updateList = async (data) => {
  try {
    const res = await fetch("/api/lists", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const list = await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

export const ModalListEdit = () => {
  const inputRef = useRef(null);
  const queryClient = useQueryClient();
  const { isEditModalOpen, closeListEditModal, data } =
    useContext(ModalContext);
  const [newTitle, setNewTitle] = useState("");

  const { mutate: update } = useMutation(updateList, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      closeListEditModal();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const input = inputRef.current;
      input.focus();
    }
  });

  if (!isEditModalOpen) {
    return null;
  }
  const editList = (list) => {
    if (list !== "") {
      const updatedTitle = list.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
      update({ id: data.id, title: updatedTitle });
    } else return;
  };
  return (
    <Transition appear show={isEditModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeListEditModal}
        initialFocus={inputRef}
      >
        <div className="fixed bottom-3 inset-x-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all border-[1px] border-grey">
                <div className="mt-2 z-10 flex flex-col">
                  <input
                    ref={inputRef}
                    className="bg-green-200 rounded-md py-2 px-2 border-[1px] border-grey"
                    type="text"
                    defaultValue={data.title}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <div className="flex flex-row w-full place-content-center gap-x-2 mt-3">
                    <button
                      onClick={() => {
                        closeListEditModal();
                        setNewTitle("");
                      }}
                      className="bg-white px-2 py-1 rounded-md w-full active:bg-slate-300 font-semibold"
                    >
                      ZAMKNIJ
                    </button>
                    <button
                      onClick={async () => editList(newTitle)}
                      className="bg-yellow px-2 py-1 rounded-md text-white w-full font-semibold"
                    >
                      ZAPISZ
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
