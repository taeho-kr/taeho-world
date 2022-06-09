//import libraries
import React from 'react'
import styled from 'styled-components'
//import components
import Stack from '../Datastructure/Stack'
//import states

const Landing = ({ }) => {
    return (
        <LandingWrapper>
            landing page
            <Stack />
        </LandingWrapper>
    )
}

const LandingWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: grey;
`

export default Landing