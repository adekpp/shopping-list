import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateList } from "utils/api";

export default function useChangeTitle() {
  const queryClient = useQueryClient();
  const { mutate: update, status } = useMutation(updateList, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return { update, status };
}
