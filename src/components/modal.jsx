import { useRecoilValue } from "recoil"
import styled from "styled-components"
import { useModal } from "../hooks"
import { modalState } from "../store"

const Modal = () => {
    const [openModal, closeModal] = useModal()
    const componentState = useRecoilValue(modalState)

    return (
        <ComponentWrapper isOpen={componentState.isOpen}>
            <ModalContent>
                {componentState.children}
            </ModalContent>
            {
                componentState.useBackmark && <BackMarker onClick={closeModal} />
            }
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: ${props => props.isOpen ? "block" : "none"};
    `

const ModalContent = styled.div`
    position: fixed;
    top: 50%;
    bottom: 50%;
    left: 50%;
    right: 50%;
    border: 1px solid white;
    min-width: 5rem;
    min-height: 3rem;
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transform: translate(-50%, -50%);
    background: #ffffff89;
    z-index: 2;
`

const BackMarker = styled.div`
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #0000004b;
`

export default Modal