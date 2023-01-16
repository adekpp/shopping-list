import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteList } from "utils/api";

export default function useDeleteList() {
  const queryClient = useQueryClient();
  const { mutate: remove } = useMutation(deleteList, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return { remove };
}
