import React from 'react';
import NavBar from './components/layout/NavBar';
import SideBar from './components/sidebar/SideBar';
import Mixer from './components/mixer/Mixer';

const App = () => {
  return (
    <div className='h-screen flex'>
      <SideBar />
      <Mixer />
    </div>
  );
};

export default App;
