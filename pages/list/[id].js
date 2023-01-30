import AddItemInput from "@/components/AddItemInput";
import DeleteButton from "@/components/DeleteButton";
import { Loader } from "@/components/ui/Loader";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useList from "hooks/useList";
import useDeleteItem from "hooks/useDeleteItem";
import useUpdateItem from "hooks/useUpdateItem";
const ListDetails = (props) => {
  const { user } = props;

  const router = useRouter();
  const [deletingItem, setDeletingItem] = useState(null);
  const { list, status } = useList({ id: router.query.id, email: user.email });
  const { remove } = useDeleteItem();
  const { update } = useUpdateItem();

  const removeItem = (item) => {
    setDeletingItem(item.id);
    remove(item);
    setDeletingItem(null);
  };

  return (
    <div>
      <div className="flex flex-row w-full place-content-between items-center">
        <AddItemInput />
      </div>
      {status === "success" ? (
        <div>
          <h1 className="font-semibold text-2xl mb-3 mt-3">{list?.title} </h1>
          <ul className="flex flex-col gap-y-3">
            <AnimatePresence>
              {list?.items.length ? (
                list.items.map((item) => (
                  <motion.li
                    animate={{
                      opacity: deletingItem?.includes(item.id) ? 0 : 1,
                    }}
                    initial={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      x: -300,
                      overflow: "hidden",
                    }}
                    transition={{ duration: 0.3 }}
                    key={item.id}
                    className={`${
                      item.isDone
                        ? "bg-yellow text-white shadow-none"
                        : "bg-white"
                    } px-2 flex flex-row gap-x-2 place-items-center py-2 shadow-md rounded-md border-[1px] border-grey transition-colors`}
                  >
                    <input
                      className="w-[20px] h-[20px] accent-blue"
                      type="checkbox"
                      checked={item.isDone}
                      value={item.isDone}
                      onChange={() => {
                        update({
                          id: item.id,
                          isDone: !item.isDone,
                          email: user.email,
                        });
                      }}
                    />
                    <div className="w-full truncate">
                      <p className="truncate"> {item.name}</p>
                    </div>
                    <div className="flex items-center">
                      <DeleteButton
                        onClick={() =>
                          removeItem({ id: item.id, email: user.email })
                        }
                      />
                    </div>
                  </motion.li>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: "0%", scale: "0%" }}
                  animate={{ opacity: "100%", scale: "100%" }}
                  transition={{ duration: 0.3, repeat: false, delay: 0.3 }}
                  className="flex w-full place-content-center mt-28"
                >
                  <p>Nie posiadasz nic na liście</p>
                </motion.div>
              )}
            </AnimatePresence>
          </ul>
        </div>
      ) : (
        <div className="flex w-full place-content-center mt-[80px]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const user = session ? session.user : null;

  return {
    props: {
      user,
    },
  };
}
export default ListDetails;
