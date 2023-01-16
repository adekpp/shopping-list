import { getSession } from "next-auth/react";
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import Button from "@/components/ui/Button";
import Lists from "@/components/Lists";
import useLists from "hooks/useLists";
import { Loader } from "@/components/ui/Loader";

export default function Home(props) {
  const { user } = props;
  const { openNewListModal, isNewListModalOpen } = useContext(ModalContext);

  const { lists, status } = useLists(user);

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
      {status === "loading" && (
        <div className="flex w-full place-content-center mt-40">
          <Loader />
        </div>
      )}
      {status === "success" && <Lists lists={lists} />}
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
