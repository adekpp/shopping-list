import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "utils/api";

export default function useDeleteItem() {
  const queryClient = useQueryClient();
  const { mutate: remove } = useMutation(deleteItem, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
    onError: () => {
      alert("there was an error");
    },
  });
  return { remove }
}
