import { useRecoilState, useResetRecoilState } from "recoil"
import { modalState } from "../store"

export const useModal = () => {
    const [modal, setModal] = useRecoilState(modalState)
    const resetModal = useResetRecoilState(modalState)

    const openModal = (children, useBackmark) => {
        const newModal = { isOpen: true, children: children, useBackmark: useBackmark }
        setModal(newModal)
    }

    const closeModal = () => {
        resetModal()
    }

    return [openModal, closeModal]
}
