import { useEffect } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Parties from "./components/parties"

const PartyPage = () => {
    const { groupId } = useParams()

    useEffect(() => {
        console.log(groupId)
    }, [groupId])

    return (
        <PageWrapper>
            {
                groupId ?
                    <Parties groupId={groupId} />
                    : <div><input type="text" text="a" /></div>
            }
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    
`

export default PartyPage