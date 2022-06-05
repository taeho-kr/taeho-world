//import libraries
import React from 'react'
import styled from 'styled-components'
//import components
import Label from '../commonComponents/label'
//import states

const NavigationBar = ({ }) => {
    return (
        <NavigationBarWrapper>
            <OpenMenuButton />
            <Label text="NavigationBar Title" />
        </NavigationBarWrapper>
    )
}

const NavigationBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    left:0;
    top: 0;
    width: 20vw;
    height: 100vh;
    background-color: yellow;
`

const OpenMenuButton = styled.div`
    position:fixed;
    top:0;
    left:0;
    width: 32px;
    height: 32px;
    background-color: red;
`

export default NavigationBar