import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { modalStateAtom } from "../store";
import useModal from "@/hooks/useModal";

const Modal = () => {
  const modalState = useRecoilValue(modalStateAtom);
  const modal = useModal();

  const onClickBackdrop = () => {
    modal.closeModal();
  };

  return (
    <ComponentWrapper show={modalState.open ? "true" : "false"}>
      <ChildrenConatiner>{modalState.children}</ChildrenConatiner>
      <Backdrop
        show={modalState.useBackdrop ? "true" : "false"}
        onClick={onClickBackdrop}
      />
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  display: ${(props) => (props.show === "true" ? "" : "none")};
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;

const ChildrenConatiner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 3;
  transform: translate(-50%, -50%);
`;

const Backdrop = styled.div`
  display: ${(props) => (props.show === "true" ? "" : "none")};
  width: 100%;
  height: 100%;
  background-color: #3f3f3f85;
  /* backdrop-filter: blur(0.5rem); */
  z-index: 1;
`;

export default Modal;
