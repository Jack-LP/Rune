import React from 'react';

const SideBar = () => {
  return (
    <div className='w-72 bg-base-200 flex flex-col py-3 px-2'>
      <h1 className='text-3xl self-center py-4'>Tapestry</h1>
      <div className='flex flex-col gap-4'>
        <h2>Home</h2>
        <div className='flex flex-col items-start'>
          <h2>My Mixes</h2>
          <button>Create mix</button>
          <p>mix 1</p>
          <p>mix 2</p>
          <p>mix 3</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
