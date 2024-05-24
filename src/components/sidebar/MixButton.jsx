import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const MixButton = ({ mixItem }) => {
  const { loadMix, deleteMix, currentMix } = useContext(AppContext);

  return (
    <div
      className={`${
        currentMix === mixItem
          ? 'bg-white/10 border-[1px] border-white/25'
          : 'bg-transprent'
      } rounded-md py-2 px-3 flex items-center gap-2`}
    >
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
