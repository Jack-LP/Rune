import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const UserButton = () => {
  const { setShowUserModal, userInfo } = useContext(AppContext);

  return (
    <div
      className='absolute cursor-pointer z-10 right-4 top-4 flex items-center'
      onClick={() => setShowUserModal(true)}
    >
      {userInfo.name && (
        <p className='bg-black/20 border-2 border-white/10 rounded-l-full pl-2 pr-4 py-[2px] text-sm -mr-3'>
          {userInfo.name}
        </p>
      )}
      <img
        className='rounded-full w-10 h-10 object-cover'
        src={userInfo.avatar}
      />
    </div>
  );
};

export default UserButton;
