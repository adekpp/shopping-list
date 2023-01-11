import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const addItem = async (data) => {
  try {
    const res = await fetch("/api/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};
const AddItemInput = () => {
  const inputRef = useRef(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;
  const [item, setItem] = useState("");
  const { mutate: add, status } = useMutation(addItem, {
    onSuccess: async (data) => {
      inputRef.current.focus();
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
    onError: () => {
      alert("there was an error");
    },
    enabled: router.isReady,
  });
  return (
    <>
      <input
        ref={inputRef}
        className="border-[1px] border-grey px-2 py-1 outline-none rounded-md drop-shadow-md w-full mr-2"
        type="text"
        value={item}
        autoFocus
        onChange={(e) => setItem(e.target.value)}
      />
      <button
        className="bg-gradient-to-r from-turquse to-seablue active:scale-90 px-3 py-2 text-white rounded-md font-semibold drop-shadow-md disabled:bg-gradient-to-r disabled:from-grey disabled:to-light-gray"
        onClick={() => {
          add({ id: id, name: item });
          setItem("");
        }}
        disabled={status === "loading"}
      >
        Dodaj
      </button>
    </>
  );
};
export default AddItemInput;
