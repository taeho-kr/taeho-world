//import libraries
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
//import components
import Label from '../../../commonComponents/label'
//import states

export const Node = ({ value, info, color }) => {
    const [infoString, setInfoString] = useState("")

    useEffect(()=>{
        console.log('test to make node')
    }, [])

    useEffect(()=>{
        setInfoString(makeTooltipMessage())
    }, [value, info])

    const makeTooltipMessage = () => {
        let strArr = []
        let infoKeyArr = Object.keys(info)

        value ? strArr.push(`value: ${value}`) : '0'
        
        infoKeyArr.forEach(el=>{
            strArr.push(`${el}: ${info.el}`)
        })

        return strArr.join('\n')
    }

    return (
        <NodeWrapper color={color}>
            <div>node</div>
            <Label>
                {value}
            </Label>
        </NodeWrapper>
    )
}

const NodeWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin:0;
    padding:0;
    border-radius: 100%;
    background-color: ${props => props.color};

    :hover{
        transform: scale(1.1);
    }
`
