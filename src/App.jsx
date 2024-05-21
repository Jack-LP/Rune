import React from 'react';
import NavBar from './components/layout/NavBar';
import Mixer from './components/mixer/Mixer';

const App = () => {
  return (
    <div className='bg-neutral-800 h-screen text-white flex flex-col gap-8'>
      <NavBar />
      <Mixer />
    </div>
  );
};

export default App;
