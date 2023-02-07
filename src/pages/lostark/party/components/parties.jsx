import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import styled from "styled-components"
import Title from "../../../../components/title"
import { useModal } from "../../../../hooks"
import { partyState } from "../../../../store"
import PartyCard from "./partyCard"
import PartyCreateModal from "./partyCreateModal"

const Parties = ({ groupId }) => {
    const [openModal, closeModal] = useModal()
    const [partyListData, setPartyListData] = useRecoilState(partyState)
    const [partyList, setPartyList] = useState([])

    useEffect(() => {
        groupPartyByTargetName()
    }, [partyListData])

    const groupPartyByTargetName = () => {
        const newPartyList = {}
        partyListData.forEach(el => {
            if (newPartyList[el.name]) newPartyList[el.name].push(el)
            else newPartyList[el.name] = [el]
        })
        setPartyList(newPartyList)
    }

    const onClickMakeParty = () => {
        openModal((<PartyCreateModal addParty={addParty} groupId={groupId} closeModal={closeModal} />), true)
    }

    const addParty = (newParty) => {
        const newPartyListData = [...partyListData]
        newPartyListData.push(newParty)
        setPartyListData(newPartyListData)
    }

    const getPartyListDOM = (target) => {
        const newDOM = []
        partyList[target].forEach(party => {
            newDOM.push(
                <PartyCard
                    title={party.title}
                    type={party.type}
                    name={party.name}
                    difficulty={party.difficulty}
                    stage={party.stage}
                    purpose={party.purpose}
                    members={party.members}
                    progress={party.progress}
                    datetime={party.datetime}
                />)
        })


        return newDOM
    }

    return (
        <ComponentWrapper>
            <input type="button" onClick={onClickMakeParty} value="파티 만들기" />
            {
                Object.keys(partyList).map(el => {
                    return (
                        <PartyListSection>
                            <Title>{el}</Title>
                            <PartyListContainer>{getPartyListDOM(el)}</PartyListContainer>
                        </PartyListSection>
                    )
                })
            }
        </ComponentWrapper >
    )
}

const ComponentWrapper = styled.div`
    
`

const PartyListSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    border-bottom: 1px solid white;
    max-width: 100vw;
    overflow-x: scroll;
    ::-webkit-scrollbar{
        display: none;
    }
`

const PartyListContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
`

export default Parties