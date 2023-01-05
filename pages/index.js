import { getSession } from "next-auth/react";

import { useQuery } from "@tanstack/react-query";
import List from "@/components/List";
import AddListButton from "@/components/AddListButton";

const getLists = async (data) => {
  try {
    const res = await fetch(`/api/lists?email=${data}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export default function Home(props) {
  const { user } = props;

  const { data: lists } = useQuery({
    queryKey: ["lists"],
    queryFn: () => getLists(user.email),
    refetchOnWindowFocus: false,
    enabled: Boolean(user),
  });
  return (
    <>
      <AddListButton />
      <ul className="flex flex-col gap-y-3">
        {lists?.map((list) => (
          <List key={list.id} list={list} />
        ))}
      </ul>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const user = session ? session.user : null;

  return {
    props: {
      user,
    },
  };
}
