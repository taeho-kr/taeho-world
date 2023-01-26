import styled from "styled-components"

const Tendencies = ({ data }) => {
    return (
        <ComponentWrapper>
            {
                data.map(el => {
                    return (
                        <div key={el.Type}>{el.Type}{el.Point}</div>
                    )
                })
            }
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    
`

export default Tendencies