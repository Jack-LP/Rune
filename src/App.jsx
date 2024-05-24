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
        src='../src-tauri/assets/img/bg-img.png'
        alt=''
        className='fixed w-screen h-screen'
      />
      <div className='h-screen flex text-white font-Inter'>
        {showUserModal ? <UserModal /> : null}
        <UserButton />
        <SideBar />
        <div className='w-full relative flex items-center justify-center'>
          <Mixer />
          <ControlBar />
        </div>
      </div>
    </>
  );
};

export default App;
