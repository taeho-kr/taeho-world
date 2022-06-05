//import libraries
import React from 'react'
import styled from 'styled-components'
//import Labels

//import states

const Label = ({ text, size, bold, italic, underline, overline, color }) => {
    return (
        <LabelWrapper>
            <Text>{text}</Text>
        </LabelWrapper>
    )
}

const LabelWrapper = styled.div`
`

const Text = styled.span`
    
`

export default Label