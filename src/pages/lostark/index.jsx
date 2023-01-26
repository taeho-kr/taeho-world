import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import styled from "styled-components"
import { API_KEY } from "../../static/keys"
import CharacterPage from "./character"
import PartyPage from "./party"

const Lostark = () => {
    const [userKey, setUserKey] = useState("")
    const myKey = API_KEY

    useEffect(() => {
        setUserKey(myKey)
    }, [])

    return (
        <PageWrapper>
            <input type="text" value={userKey} onChange={setUserKey} />
            <Link to={"character"}>character</Link>
            <Link to={"party"}>party</Link>
            <Routes>
                <Route path="/character" element={<CharacterPage />} />
                <Route path="/party" element={<PartyPage />} />
            </Routes>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    
`

export default Lostark