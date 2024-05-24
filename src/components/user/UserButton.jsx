import React from 'react';

const UserButton = ({ setShowUserModal }) => {
  return (
    <img
      onClick={() => setShowUserModal(true)}
      className='absolute top-4 right-4 rounded-full w-8 h-8 z-10 cursor-pointer'
      src='../../../src-tauri/assets/img/default-user.jpg'
    />
  );
};

export default UserButton;
