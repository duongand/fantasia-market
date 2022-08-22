import { useState } from 'react';

function useTransactionModal() {
  const [modalKey, setModalKey] = useState('Buy');
  const [showModal, setShowModal] = useState(false);

  function openModal(event) {
    setModalKey(event.target.value);
    setShowModal(true);
  };

  function closeModal() {
    setShowModal(false);
  };

  return { modalKey, showModal, openModal, closeModal }
};

export default useTransactionModal;