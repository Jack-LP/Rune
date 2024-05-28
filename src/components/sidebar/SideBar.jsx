import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import MixModal from './MixModal';
import SideBarButton from './SideBarButton';
import MixButton from './MixButton';

const SideBar = ({}) => {
  const [showModal, setShowModal] = useState(false);

  const { setRandomVolumes, resetVolumes, savedMixes } = useContext(AppContext);

  return (
    <>
      {showModal ? <MixModal setShowModal={setShowModal} /> : null}
      <div className='w-80 bg-black/20 backdrop-blur-md border-r-2 border-white/25 flex flex-col px-4 gap-10 pt-10'>
        <div className='flex self-center items-center gap-1'>
          <img src='/assets/img/Rune.svg' alt='' className='w-7' />
          <h1 className='text-4xl font-semibold'>Rune</h1>
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-lg'>Menu</h2>
          <div className='flex flex-col gap-2'>
            <SideBarButton func={setRandomVolumes}>
              <i className='fa-solid fa-dice-four'></i>
              <p>Random</p>
            </SideBarButton>
            <SideBarButton func={resetVolumes}>
              <i className='fa-solid fa-rotate-left'></i>
              <p>Reset</p>
            </SideBarButton>
          </div>
        </div>
        <div className='flex flex-col gap-4 overflow-y-auto'>
          <h2 className='text-lg'>My Mixes</h2>
          <div className='flex flex-col gap-2 overflow-y-auto'>
            <SideBarButton func={() => setShowModal(true)}>
              <i className='fa-solid fa-plus'></i>
              <p>Create New</p>
            </SideBarButton>
            <div className='flex flex-col gap-2 overflow-y-scroll hide-scrollbar pb-2'>
              {savedMixes.map((mixItem) => (
                <MixButton key={mixItem.id} mixItem={mixItem} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
