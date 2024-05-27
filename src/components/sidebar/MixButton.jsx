import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const MixButton = ({ mixItem }) => {
  const { loadMix, deleteMix, currentMix } = useContext(AppContext);

  const handleEdit = (e) => {
    e.stopPropagation();
    deleteMix(currentMix);
  };

  return (
    <div
      className={`${
        currentMix === mixItem ? 'bg-white/10' : 'bg-transprent'
      } rounded-md py-2 px-3 flex items-center gap-2 hover:bg-white/10 group cursor-pointer`}
      onClick={() => loadMix(mixItem)}
    >
      <button className='flex items-center gap-3'>
        <div
          className='w-3 h-3 rounded-full'
          style={{ backgroundColor: mixItem.color }}
        ></div>
        <p>{mixItem.name}</p>
      </button>
      <button className='ml-auto hidden group-hover:block' onClick={handleEdit}>
        <i className='fa-solid fa-edit'></i>
      </button>
    </div>
  );
};

export default MixButton;
