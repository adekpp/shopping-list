import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getList } from "utils/api";

export default function useList(data) {
  const [list, setList] = useState(null);
  const { status, data: lists } = useQuery({
    queryKey: ["list"],
    queryFn: () => getList({ email: data.email, id: data?.id }),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 0,
    enabled: Boolean(data),
    onSuccess: (lists) => {
      let newList = lists[0];
      setList(newList);
    },
  });
  return { list, status };
}
