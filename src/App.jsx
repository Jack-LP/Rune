import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from './context/AppContext';
import Theme from './components/common/Theme';
import SideBar from './components/sidebar/SideBar';
import Mixer from './components/mixer/Mixer';
import UserButton from './components/user/UserButton';
import UserModal from './components/user/UserModal';
import ControlBar from './components/controlbar/ControlBar';

const App = () => {
  const { showUserModal } = useContext(AppContext);

  return (
    <>
      <Theme />
      <div className='bg-[url("/assets/img/bg-noise.png")] absolute inset-0 -z-10 opacity-10'></div>
      <div className='h-screen flex text-white font-Geist'>
        {showUserModal && <UserModal />}
        <UserButton />
        <SideBar />
        <div className='flex items-center justify-center w-full'>
          <Mixer />
          <ControlBar />
        </div>
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={true}
        theme='dark'
      />
    </>
  );
};

export default App;
