//import libraries
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
//import components
import Label from '../../../commonComponents/label'
//import states

export const Node = ({ value, info, color }) => {
    const [infoString, setInfoString] = useState("")

    useEffect(()=>{
        setInfoString(makeTooltip())
    }, [key, value, info])

    const makeTooltip = () => {
        let strArr = []
        let infoKeyArr = Object.keys(info)
        
        key ? strArr.push(`key: ${key}`) : ''
        value ? strArr.push(`value: ${value}`) : ''
        
        infoKeyArr.forEach(el=>{
            strArr.push(`${el}: ${info.el}`)
        })

        return strArr.join('\n')
    }

    return (
        <NodeWrapper color={color}>
            <Label>
                {value}
                {infoString}
            </Label>
        </NodeWrapper>
    )
}

const NodeWrapper = styled.div`
    margin:0;
    padding:0;
    border-radius: 100%;
    background-color: ${props => props.color};

    :hover{
        transform: scale(1.1);
    }
`
