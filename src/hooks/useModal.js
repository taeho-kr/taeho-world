import { useResetRecoilState, useSetRecoilState } from "recoil";
import { modalStateAtom } from "../store";

const useModal = () => {
  const setModalState = useSetRecoilState(modalStateAtom);
  const initModalState = useResetRecoilState(modalStateAtom);

  const openModal = (children, useBackdrop, onOpen) => {
    const newModalState = {
      open: true,
      children: children,
      useBackdrop: useBackdrop,
    };

    setModalState(newModalState);
    onOpen && onOpen();
  };

  const closeModal = (onClose) => {
    initModalState();
    onClose && onClose();
  };

  return {
    openModal,
    closeModal,
  };
};

export default useModal;
