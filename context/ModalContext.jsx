import React, { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewListModalOpen, setIsNewListModalOpen] = useState(false);
  const [editingList, setEditingList] = useState({});

  const openListEditModal = () => setIsEditModalOpen(true);
  const closeListEditModal = () => setIsEditModalOpen(false);
  const openNewListModal = () => setIsNewListModalOpen(true);
  const closeNewListModal = () => setIsNewListModalOpen(false);
  const editList = (list) => setEditingList(list);

  return (
    <ModalContext.Provider
      value={{
        isEditModalOpen,
        isNewListModalOpen,
        openListEditModal,
        closeListEditModal,
        openNewListModal,
        closeNewListModal,
        editingList,
        editList,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
