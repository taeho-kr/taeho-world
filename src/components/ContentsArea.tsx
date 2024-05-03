import styled from "styled-components";

interface Props {
    children: React.ReactNode;
}

const ContentsArea = (
    {
        children
    }: Props
) => {
    return (
        <ComponentWrapper>
            {children}
        </ComponentWrapper>
    );
}

const ComponentWrapper = styled.div`
    width: 100%;
    height: 100%;
`

export default ContentsArea;