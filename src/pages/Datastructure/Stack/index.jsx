//import libraries
import React from 'react'
import styled from 'styled-components'
//import components
import { Node } from '../components/Node'
//import states

const Stack = ({ }) => {
    return (
        <StackWrapper>
            <div>stack page</div>
            <Node value={2} info={{ key:'sample key', info1: 'info1 test', info2: 'info2 test' }} color={"red"} />
        </StackWrapper>
    )
}

const StackWrapper = styled.div`
    
`

export default Stack