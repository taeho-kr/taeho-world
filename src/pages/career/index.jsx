import React from "react"
import styled from "styled-components"
import Card from "../../components/card"

const CareerPage = ({ }) => {

    return (
        <CareerPageWrapper>
            <Card>
                <div>product: StyleAR</div>
                <a href="https://stylear.ai">https://stylear.ai/</a>
                <div>company: Deelpixel</div>
            </Card>
            <Card>
            </Card>
        </CareerPageWrapper>
    )
}

const CareerPageWrapper = styled.div`

`

export default CareerPage