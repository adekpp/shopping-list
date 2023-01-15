import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "@/context/ModalContext";
import TextInput from "./ui/TextInput";
import Button from "./ui/Button";
import { updateList } from "utils/api";
import { useSession } from "next-auth/react";

export const ListEditModal = () => {
  const { data: session } = useSession();
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
      update({ id: data.id, title: updatedTitle, email: session.user.email });
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
                  <TextInput
                    focused="true"
                    type="text"
                    defaultValue={data.title}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="bg-amber-100 rounded-md py-2 px-1 shadow-md"
                  />
                  <div className="flex flex-row w-full place-content-center gap-x-2 mt-3">
                    <Button
                      fullWidth="true"
                      intent="secondary"
                      onClick={() => {
                        closeListEditModal();
                        setNewTitle("");
                      }}
                    >
                      ZAMKNIJ
                    </Button>
                    <Button
                      fullWidth="true"
                      intent="warning"
                      onClick={async () => editList(newTitle)}
                    >
                      ZAPISZ
                    </Button>
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
