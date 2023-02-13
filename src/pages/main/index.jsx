import styled from "styled-components"
import SolarSystem from "../../components/solarSystem"

const Main = () => {
    return (
        <PageWrapper>
            <SolarSystem />
            <div>main page</div>
            <a href="/career">career</a>
            <a href="/lostark">lostark</a>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export default Main