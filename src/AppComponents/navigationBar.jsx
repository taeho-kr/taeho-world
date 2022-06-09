//import libraries
import React from 'react'
import styled from 'styled-components'
//import components
import Label from '../commonComponents/label'
//import states

const NavigationBar = ({ }) => {
    return (
        <NavigationBarWrapper>
            <Label text="NavigationBar Title" />
            <NavigationBarIcon/>
            <Label text="name" />
        </NavigationBarWrapper>
    )
}

const NavigationBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 20vw;
    height: 100%;
    background-color: yellow;
`

const NavigationBarIcon = styled.img`
    padding:0;
    margin:0;
    width:100px;
    height:100px;
    background-color: black;
    border-radius: 100%;
`


export default NavigationBar