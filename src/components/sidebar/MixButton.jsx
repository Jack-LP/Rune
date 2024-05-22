import React from 'react';

const MixButton = ({ mixItem, loadMix, deleteMix }) => {
  return (
    <div className='flex items-center bg-neutral-950/50 rounded-md py-2 px-3'>
      <button
        className='flex items-center gap-3'
        onClick={() => loadMix(mixItem)}
      >
        <div
          className='w-3 h-3 rounded-full'
          style={{ backgroundColor: mixItem.color }}
        ></div>
        <p>{mixItem.name}</p>
      </button>
      <button className='ml-auto' onClick={() => deleteMix(mixItem)}>
        <i className='fa-solid fa-trash'></i>
      </button>
    </div>
  );
};

export default MixButton;
