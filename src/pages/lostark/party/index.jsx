import { useEffect } from "react"
import { Route, Routes, useParams } from "react-router-dom"
import styled from "styled-components"
import Parties from "./components/parties"
import PartyCard from "./components/partyCard"

const PartyPage = () => {
    // const tempMembers = ["사격사령관"]
    const tempMembers = ["사격사령관", "먹물사령관"]
    // const tempMembers = ["사격사령관", "일격사령관", "먹물사령관"]
    const { groupId } = useParams()

    useEffect(() => {
        console.log(groupId)
    }, [groupId])

    const getParties = () => {

    }

    return (
        <PageWrapper>
            <Routes>
                <Route path="/" element={<></>} />
                <Route path=":groupId" element={<Parties groupId={groupId} />} />
            </Routes>
            <PartyCard title={'title'} targetName={'카양겔'} targetLevel={'하드2'} purpose={'트라이'} members={tempMembers} progress={0} />

        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    
`

export default PartyPage