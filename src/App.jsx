import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home';
import Signin from './pages/signin/Signin';
import Messenger from './pages/messenger/Messenger';
import Search from './pages/search/Search';
import People from './pages/people/People';
import Profile from './pages/profile/Profile';
import AudioCall from './pages/call/AudioCall';
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/one' element={<Home />} />
          <Route path='/search/:keyword' element={<Search />} />
          <Route path='/profile/:tab' element={<Profile />} />
          <Route path='/friend/call/audio/:friendId' element={<AudioCall />} />
          <Route path='/people/:peopleId' element={<People />} />
          <Route path='/messenger/:userId' element={<Messenger />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
