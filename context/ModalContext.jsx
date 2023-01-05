import React, { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewListModalOpen, setIsNewListModalOpen] = useState(false);
  const [data, setData] = useState({});

  const openListEditModal = () => setIsEditModalOpen(true);
  const closeListEditModal = () => setIsEditModalOpen(false);
  const openNewListModal = () => setIsNewListModalOpen(true);
  const closeNewListModal = () => setIsNewListModalOpen(false);
  const setList = (list) => setData(list);

  return (
    <ModalContext.Provider
      value={{
        isEditModalOpen,
        isNewListModalOpen,
        openListEditModal,
        closeListEditModal,
        openNewListModal,
        closeNewListModal,
        data,
        setList,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
