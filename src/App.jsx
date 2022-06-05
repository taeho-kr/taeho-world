//import libraries
import React from 'react'
import styled from 'styled-components'
import { RecoilRoot } from 'recoil'
import { Routes, Route } from 'react-router'

//import components
import Landing from './pages/Landing'
import Datastructure from './pages/Datastructure'
import NavigationBar from './AppComponents/navigationBar'

//import states

const App = () => {
  return (
    <RecoilRoot>
      <AppWrapper>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/datastructure" element={<Datastructure />} />
        </Routes>
      </AppWrapper>
    </RecoilRoot>
  )
}

const AppWrapper = styled.div`
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
`

export default App