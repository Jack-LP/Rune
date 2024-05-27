import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';
import SideBar from './components/sidebar/SideBar';
import Mixer from './components/mixer/Mixer';
import UserButton from './components/user/UserButton';
import UserModal from './components/user/UserModal';
import ControlBar from './components/controlbar/ControlBar';

const App = () => {
  const { showUserModal, userInfo } = useContext(AppContext);

  return (
    <>
      {userInfo.theme !== 'default' ? (
        <img
          src={`../src-tauri/assets/img/theme/${userInfo.theme}.jpg`}
          alt=''
          className='fixed w-screen h-screen -z-20 blur-xl scale-110'
        />
      ) : (
        <div className='fixed w-screen h-screen -z-20 bg-neutral-800' />
      )}
      <div className='bg-[url("../src-tauri/assets/img/bg-noise.png")] absolute inset-0 -z-10 opacity-10'></div>
      <div className='h-screen flex text-white font-Geist'>
        {showUserModal ? <UserModal /> : null}
        <UserButton />
        <SideBar />
        <div className='flex items-center justify-center w-full'>
          <Mixer />
          <ControlBar />
        </div>
      </div>
    </>
  );
};

export default App;
