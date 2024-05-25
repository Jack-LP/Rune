import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';
import SideBar from './components/sidebar/SideBar';
import Mixer from './components/mixer/Mixer';
import UserButton from './components/user/UserButton';
import UserModal from './components/user/UserModal';
import ControlBar from './components/controlbar/ControlBar';

const App = () => {
  const { showUserModal } = useContext(AppContext);

  return (
    <>
      <img
        src='https://images.unsplash.com/photo-1476842634003-7dcca8f832de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt=''
        className='fixed w-screen h-screen -z-10'
      />
      <div className='h-screen flex text-white font-Inter'>
        {showUserModal ? <UserModal /> : null}
        <UserButton />
        <SideBar />
        <div className='grid grid-rows-[1fr_auto] h-full w-full items-center'>
          <Mixer />
          <ControlBar />
        </div>
      </div>
    </>
  );
};

export default App;
