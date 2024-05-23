import React from 'react';
import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { save } from '@tauri-apps/api/dialog';
import { v4 as uuidv4 } from 'uuid';

const UserModal = ({ setShowUserModal, savedMixes }) => {
  const handleExport = async () => {
    const jsonString = JSON.stringify(savedMixes, null, 2);

    const filePath = await save({
      defaultPath: `mixData-${uuidv4()}.json`,
      filters: [
        {
          name: 'JSON',
          extensions: ['json'],
        },
      ],
    });

    if (filePath) {
      await writeTextFile(filePath, jsonString, {
        dir: BaseDirectory.Download,
      });
    }
  };

  return (
    <div
      className='inset-0 bg-neutral-950/75 backdrop-blur-md absolute z-10 flex items-center justify-center'
      onClick={() => setShowUserModal(false)}
    >
      <div
        className='bg-neutral-800 p-6 rounded-md w-96 flex flex-col gap-6'
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className='text-lg font-semibold'>Your profile</h1>
        <div className='flex'>
          <img src='https://picsum.photos/200' alt='' />
          <div className='flex flex-col gap-3'>
            <input
              type='text'
              placeholder='Name'
              className='bg-transparent border-[1px] border-white/20 rounded-md p-2 outline-none w-full'
            />
            <h3>3 mixes</h3>
            <button onClick={handleExport}>export mixes</button>
            <button>import mixes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
