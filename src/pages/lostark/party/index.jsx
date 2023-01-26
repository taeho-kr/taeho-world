import styled from "styled-components"
import PartyCard from "./components/partyCard"

const PartyPage = () => {

    // const tempMembers = ["사격사령관"]
    const tempMembers = ["사격사령관", "먹물사령관"]
    // const tempMembers = ["사격사령관", "일격사령관", "먹물사령관"]

    return (
        <PageWrapper>
            party page
            <PartyCard title={'title'} targetName={'카양겔'} targetLevel={'하드2'} purpose={'트라이'} members={tempMembers} progress={0} />
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    
`

export default PartyPage