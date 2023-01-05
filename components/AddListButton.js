import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";

import { ModalContext } from "../context/ModalContext";
const AddListButton = () => {
  const { openNewListModal, isNewListModalOpen } = useContext(ModalContext);

  return (
    <div>
      <div className="flex w-full place-content-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 active:scale-90 px-2 py-1 text-white rounded-md disabled:bg-gray-400 font-semibold"
          onClick={openNewListModal}
          disabled={isNewListModalOpen}
        >
          Utwórz listę
        </button>
      </div>
    </div>
  );
};
export default AddListButton;
