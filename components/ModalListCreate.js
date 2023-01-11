import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "@/context/ModalContext";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import checkAndTrim from "ultis/checkAndTrim";
const createList = async (data) => {
  try {
    const res = await fetch("/api/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: data.title, email: data.author }),
    });
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

export const ModalListCreate = () => {
  const { data } = useSession();
  const router = useRouter();
  const inputRef = useRef(null);
  const queryClient = useQueryClient();
  const { isNewListModalOpen, closeNewListModal } = useContext(ModalContext);
  const [list, setList] = useState("");

  const { mutate: create } = useMutation(createList, {
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

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const input = inputRef.current;
      input.focus();
    }
  });

  if (!isNewListModalOpen) {
    return null;
  }

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
        initialFocus={inputRef}
      >
        <div className="fixed inset-0 bg-yellow" />
        <div className="fixed inset-0 overflow-y-auto">
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl   p-6 text-left align-middle transition-all">
                <div className="mt-2 z-10 flex flex-col">
                  <input
                    ref={inputRef}
                    className="rounded-md py-2 px-2 outline-none"
                    type="text"
                    placeholder="Nowa lista"
                    value={list.title}
                    onChange={(e) => setList(e.target.value)}
                  />
                  <div className="flex flex-row w-full place-content-center gap-x-2 mt-3">
                    <button
                      onClick={() => {
                        closeNewListModal();
                        setList("");
                      }}
                      className="bg-white px-2 py-1 rounded-md w-full active:bg-slate-300 active:scale-90 font-semibold"
                    >
                      ZAMKNIJ
                    </button>
                    <button
                      onClick={() =>
                        // create({ title: list, author: data.user.email })
                        createNewList(list)
                      }
                      className="bg-yellow px-2 py-1 rounded-md text-white w-full font-semibold active:bg-green-600 active:scale-90 duration-100"
                    >
                      Utwórz
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
