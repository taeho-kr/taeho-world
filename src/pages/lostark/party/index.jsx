import { useParams } from "react-router-dom"
import styled from "styled-components"
import Parties from "./components/parties"

const PartyPage = () => {
    const { groupId } = useParams()

    return (
        <PageWrapper>
            {
                groupId ?
                    <Parties groupId={groupId} />
                    : <div></div>
            }
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    
`

export default PartyPage