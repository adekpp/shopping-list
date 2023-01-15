import Link from "next/link";
import { ProgressBar } from "./ProgressBar";
import { ListMenu } from "./ListMenu";
import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import { useSession } from "next-auth/react";

const List = ({ list }) => {
  const { setList } = useContext(ModalContext);
  const { data: session } = useSession();

  const itemsDone = () => {
    const itemsDone = [];
    list?.items.forEach((item) => {
      if (item.isDone) {
        itemsDone.push(item);
      }
    });
    return itemsDone.length;
  };

  const handleEdit = (list) => {
    setList(list);
  };

  return (
    <li
      className=" relative flex flex-col place-content-between items-center
      bg-white py-4 px-4 font-semibold w-full rounded-md shadow-lg border-[1px]
      border-grey"
    >
      <ListMenu user={session.user} list={list} />
      <div
        onClick={() => {
          handleEdit(list);
        }}
      ></div>
      <Link href={`/list/${list?.id}`} className="w-full">
        <div className="flex flex-row place-content-between w-full">
          <p>{list?.title}</p>
        </div>
        <div className="flex flex-row items-center gap-x-3 mt-3">
          <ProgressBar items={list?.items} />
          <p>
            {itemsDone()}/{list?.items.length}
          </p>
        </div>
      </Link>
    </li>
  );
};
export default List;
