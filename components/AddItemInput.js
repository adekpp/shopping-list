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
  const { mutate: add } = useMutation(addItem, {
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
        className="border-[1px] border-grey px-2 py-1 outline-none rounded-md"
        type="text"
        value={item}
        autoFocus
        onChange={(e) => setItem(e.target.value)}
      />
      <button
        className="bg-gradient-to-r from-turquse to-seablue active:scale-90 px-2 py-1 text-white rounded-md disabled:bg-grey font-semibold"
        onClick={() => {
          add({ id: id, name: item });
          setItem("");
        }}
      >
        Dodaj
      </button>
    </>
  );
};
export default AddItemInput;
