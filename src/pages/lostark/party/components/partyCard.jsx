import styled from "styled-components"
import Card from "../../../../components/card"
import PartyMemberBox from "./partyMemberBox"

const PartyCard = ({ title, name, difficulty, stage, purpose, progress, members, datetime }) => {

    const getPartyCardHeader = () => {
        return (
            <PartyCardHeader>
                <PartyCardTitle>
                    <TargetName>
                        {name}
                    </TargetName>
                    <TargetLevel>
                        {difficulty}
                    </TargetLevel>
                </PartyCardTitle>
                <PartyCardInfoSection>
                    <div>{`${stage[0]}-${stage[1]}관문`}</div>
                    {/* <div>{progress}</div> */}
                </PartyCardInfoSection>
            </PartyCardHeader>
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
            <Card title={getPartyCardHeader()} description={purpose}>
                {datetime ? datetime.toLocaleString() : '시간 미정'}
                {getPartyMembersDOM()}
            </Card>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    width: 20rem;
`

const PartyCardHeader = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    justify-content: space-between;
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

const PartyCardInfoSection = styled.div`
    display: flex;
    flex-direction: row;
`

export default PartyCard