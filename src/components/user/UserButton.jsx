import React from 'react';

const UserButton = ({ setShowUserModal }) => {
  return (
    <button
      onClick={() => setShowUserModal(true)}
      className='absolute top-4 right-4 bg-pink-500 rounded-full p-2'
    >
      U
    </button>
  );
};

export default UserButton;
