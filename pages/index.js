import { getSession } from "next-auth/react";
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import Lists from "@/components/Lists";
import { getLists } from "utils/api";


export default function Home(props) {
  const { user } = props;
  const { openNewListModal, isNewListModalOpen } = useContext(ModalContext);
  const { data: lists } = useQuery({
    queryKey: ["lists"],
    queryFn: () => getLists(user.email),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: Boolean(user),
  });
  return (
    <>
      <div className="flex w-full place-content-end mb-4">
        <Button
          intent="primary"
          onClick={openNewListModal}
          disabled={isNewListModalOpen}
        >
          Utwórz listę
        </Button>
      </div>
      <Lists lists={lists} />
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
