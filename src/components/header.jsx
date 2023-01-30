import { Link } from "react-router-dom"
import styled from "styled-components"

const Header = () => {
    return (
        <ComponentWrapper>
            <Link to="/">header</Link>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    
`

export default Header