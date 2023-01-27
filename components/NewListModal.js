import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useContext, useRef, useState } from "react";
import { ModalContext } from "@/context/ModalContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import TextInput from "./ui/TextInput";
import Button from "./ui/Button";
import { createList } from "utils/api";

export const NewListModal = () => {
  const { data } = useSession();
  const router = useRouter();
  const ref = useRef(null);
  const queryClient = useQueryClient();
  const { isNewListModalOpen, closeNewListModal } = useContext(ModalContext);
  const [list, setList] = useState("");

  const { mutate: create, status } = useMutation(createList, {
    onSuccess: async (data) => {
      router.push(`/list/${data.id}`);
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      setList("");
      closeNewListModal();
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const createNewList = (list) => {
    if (list !== "") {
      const newList = list.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
      create({ title: newList, author: data.user.email });
    } else {
      create({ title: "Nowa lista", author: data.user.email });
    }
  };

  return (
    <Transition appear show={isNewListModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeNewListModal}
        initialFocus={ref}
      >
        <div className="fixed inset-0 bg-yellow" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full mt-10 justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl   p-6 text-left align-middle transition-all">
                <div className="mt-2 z-10 flex flex-col">
                  <TextInput
                    intent="secondary"
                    focused="true"
                    type="text"
                    placeholder="Nowa lista"
                    value={list.title}
                    onChange={(e) => setList(e.target.value)}
                  />
                  <div className="flex flex-row w-full place-content-center gap-x-2 mt-3">
                    <Button
                      fullWidth
                      intent="secondary"
                      onClick={() => {
                        closeNewListModal();
                        setList("");
                      }}
                    >
                      ZAMKNIJ
                    </Button>
                    <Button
                      fullWidth
                      intent={status === "loading" ? "disabled" : "primary"}
                      disabled={status === "loading"}
                      onClick={() => createNewList(list)}
                    >
                      <span className="drop-shadow-md">DODAJ</span>
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
