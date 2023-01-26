import styled from "styled-components"

const Main = () => {
    return (
        <PageWrapper>
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