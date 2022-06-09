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
        <PageArea>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/datastructure" element={<Datastructure />} />
          </Routes>
        </PageArea>
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

const PageArea = styled.div`
  margin-left: 20%;
  width:80%;
  height: 100%;
`

export default App