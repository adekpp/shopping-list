import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";

import { ModalContext } from "../context/ModalContext";
const AddListButton = () => {
  const { openNewListModal, isNewListModalOpen } = useContext(ModalContext);
  return (
    <div>
      <div className="flex w-full place-content-end mb-4">
        <button
          className="bg-gradient-to-r from-turquse to-seablue text-white active:scale-90 px-3 py-2  rounded-md disabled:bg-gradient-to-r disabled:from-grey disabled:to-light-gray font-semibold drop-shadow-md"
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
