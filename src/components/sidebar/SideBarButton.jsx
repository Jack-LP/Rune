import React from 'react';

const SideBarButton = ({ func, children }) => {
  return (
    <button
      className='rounded-md py-2 px-3 flex items-center gap-2 bg-white/10'
      onClick={func}
    >
      {children}
    </button>
  );
};

export default SideBarButton;
