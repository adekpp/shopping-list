import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { addItem } from "utils/api";
import { useSession } from "next-auth/react";

const AddItemInput = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;
  const [item, setItem] = useState("");

  const { mutate: add, status } = useMutation(addItem, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
    onError: () => {
      alert("there was an error");
    },
    enabled: router.isReady,
  });

  const addNewItem = (item) => {
    if (item.name !== "") {
      const newItem = item.name.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
      add({ name: newItem, id: id, email: session.user.email });
    } else return;
  };

  return (
    <div className="flex w-full gap-x-2">
      <TextInput
        fullWidth="true"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <Button
        intent="primary"
        onClick={() => {
          addNewItem({ name: item });
          setItem("");
        }}
        disabled={status === "loading"}
      >
        Dodaj
      </Button>
    </div>
  );
};
export default AddItemInput;
