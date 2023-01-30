import styled from "styled-components"
import Card from "../../../../components/card"
import PartyMemberBox from "./partyMemberBox"

const PartyCard = ({ title, name, difficulty, stages, purpose, progress, members }) => {

    const getPartyCardTitle = () => {
        return (
            <PartyCardTitle>
                <TargetName>
                    {name}
                </TargetName>
                <TargetLevel>
                    {difficulty}
                </TargetLevel>
            </PartyCardTitle>
        )
    }

    const getPartyMembersDOM = () => {
        const membersDOM = []

        members.forEach((el, i) => {
            membersDOM.push(
                <PartyMemberBox name={el} key={i} />
            )
        })

        const memberAvailableNumber = membersDOM.length
        for (let i = 0; i < 4 - memberAvailableNumber; i++) membersDOM.push(getEmptyMember(membersDOM.length + i))

        return membersDOM
    }

    const getEmptyMember = (index) => {
        return (
            <PartyMemberBox key={index} />
        )
    }

    return (
        <ComponentWrapper>
            <Card title={getPartyCardTitle()} description={purpose}>
                {getPartyMembersDOM()}
            </Card>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    
`

const PartyCardTitle = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
`

const TargetName = styled.span`
    
`

const TargetLevel = styled.span`
    color: orange;
`

export default PartyCard