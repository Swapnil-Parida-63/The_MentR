import { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null); // 'parent', 'teacher', 'lead', or null
  const [modalConfig, setModalConfig] = useState({});

  const openModal = (type, config = {}) => {
    setActiveModal(type);
    setModalConfig(config || {});
  };
  const closeModal = () => {
    setActiveModal(null);
    setModalConfig({});
  };

  return (
    <ModalContext.Provider value={{ activeModal, modalConfig, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
