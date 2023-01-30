import { useRecoilState } from "recoil"
import styled from "styled-components"
import { useModal } from "../../../../hooks"
import { partyState } from "../../../../store"
import PartyCard from "./partyCard"
import PartyCreateModal from "./partyCreateModal"

const Parties = ({ groupId }) => {
    const [openModal, closeModal] = useModal()
    const [partyList, setPartyList] = useRecoilState(partyState)

    const onClickMakeParty = () => {
        openModal((<PartyCreateModal addParty={addParty} groupId={groupId} />), true)
    }

    const addParty = (newParty) => {
        setPartyList([...partyList, newParty])
    }

    return (
        <ComponentWrapper>
            <input type="button" onClick={onClickMakeParty} value="파티 만들기" />
            {groupId}
            <PartyCard title={'title'} targetName={'카양겔'} targetLevel={'하드2'} purpose={'트라이'} members={["사격사령관"]} progress={0} />
            {
                partyList.map(el => {
                    return (
                        <PartyCard title={el.title} type={el.target.type} name={el.target.name} difficulty={el.target.difficulty} stages={el.target.stages} purpose={el.target.purpose} members={[""]} progress={0} />
                    )
                })
            }
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    
`

export default Parties