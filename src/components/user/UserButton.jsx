import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const UserButton = () => {
  const { setShowUserModal, userInfo } = useContext(AppContext);

  return (
    <img
      onClick={() => setShowUserModal(true)}
      className='absolute top-4 right-4 rounded-full w-10 h-10 z-10 cursor-pointer'
      src={userInfo.avatar}
    />
  );
};

export default UserButton;
