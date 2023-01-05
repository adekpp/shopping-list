import AddItemInput from "@/components/AddItemInput";
import DeleteButton from "@/components/DeleteButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const getList = async (id) => {
  try {
    const res = await fetch(`/api/lists?id=${id}`);
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const deleteItem = async (id) => {
  try {
    const res = await fetch(`/api/item?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

export const updateItem = async (data) => {
  try {
    const res = await fetch("/api/item", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const ListDetails = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [list, setList] = useState(null);
  const { data } = useQuery(["list"], () => getList(router.query.id), {
    onSuccess: async (data) => {
      setList(data[0]);
    },
    cacheTime: 0,
    enabled: router.isReady,
  });

  const { mutate: remove } = useMutation(deleteItem, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
    onError: () => {
      alert("there was an error");
    },
  });

  const { mutate: update } = useMutation(updateItem, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
    onError: () => {
      alert("there was an error");
    },
  });
  return (
    <div>
      <div className="flex flex-row place-content-center items-center gap-x-2">
        <AddItemInput />
      </div>
      <div>
        <h1 className="font-semibold text-xl mb-3 mt-3">{list?.title} </h1>
        <ul className="flex flex-col gap-y-3">
          {list?.items.map((item) => (
            <li
              key={item.id}
              className={`${
                item.isDone ? "bg-green-600 text-white shadow-none" : "bg-white"
              } px-2 flex flex-row gap-x-2 place-items-center py-2 shadow-md rounded-md`}
            >
              <input
                className="w-[18px] h-[18px] accent-green-600"
                type="checkbox"
                checked={item.isDone}
                value={item.isDone}
                onChange={() => {
                  update({ id: item.id, isDone: !item.isDone });
                }}
              />
              <p className="w-full"> {item.name}</p>
              <div className="flex items-center">
                <DeleteButton onclick={() => remove(item.id)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListDetails;