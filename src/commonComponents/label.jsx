//import libraries
import React from 'react'
import styled from 'styled-components'
//import Labels

//import states

const Label = ({ text, size, bold, italic, underline, lineThrough, overline, color }) => {
    return (
        <LabelWrapper>
            <Text
                size={size}
                bold={bold}
                italic={italic}
                underline={underline}
                lineThrough={lineThrough}
                overline={overline}
                color={color}>{text}
            </Text>
        </LabelWrapper>
    )
}

const LabelWrapper = styled.div`
    margin:0;
    padding:0;
`

const Text = styled.span`
    font-size: ${props => props.size ? props.size : 16}px;
    text-decoration: ${props => {
        let textDecoration = []
        props.underline ? textDecoration.push('underline') : ''
        props.overline ? textDecoration.push('overline') : ''
        props.lineThrough ? textDecoration.push('line-through') : ''
        return textDecoration.join(' ')
    }};
    color: ${props=>props.color};
    font-style: ${props=> props.italic ? 'italic' : ''};
`

export default Label