import { useQuery } from "@tanstack/react-query";
import { getLists } from "utils/api";

export default function useLists(user) {
  const { status, data: lists } = useQuery({
    queryKey: ["lists"],
    queryFn: () => getLists(user.email),

    refetchOnWindowFocus: false,
  });
  return { lists, status };
}
