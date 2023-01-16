import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItem } from "utils/api";

export default function useUpdateItem() {
  const queryClient = useQueryClient();
  const { mutate: update } = useMutation(updateItem, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
    onError: () => {
      alert("there was an error");
    },
  });
  return { update };
}
