import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { save } from '@tauri-apps/api/dialog';
import { v4 as uuidv4 } from 'uuid';
import ThemeButton from './ThemeButton';

const UserModal = () => {
  const { savedMixes, setShowUserModal, userInfo, setUserInfo } =
    useContext(AppContext);

  const themes = ['default', 'blue', 'green', 'grey', 'orange'];

  const handleNameChange = (e) => {
    setUserInfo((prev) => ({ ...prev, name: e.target.value }));
  };

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
      className='inset-0 bg-neutral-950/75 backdrop-blur-md absolute z-20 flex items-center justify-center'
      onClick={() => setShowUserModal(false)}
    >
      <div
        className='bg-neutral-900 rounded-md p-8 flex flex-col gap-8 relative'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute top-4 right-5 text-2xl text-white/50 hover:text-white'
          onClick={() => setShowUserModal(false)}
        >
          <i className='fa-solid fa-xmark'></i>
        </button>
        <p className='absolute bottom-2 right-5 text-xs text-white/10 select-none font-GeistMono'>
          sound-mixer v1.0.0
        </p>
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold'>Profile</h2>
          <div className='flex items-center gap-4'>
            <img src={userInfo.avatar} alt='' className='rounded-full w-32' />
            <div className='flex flex-col gap-2'>
              <input
                type='text'
                className='bg-transparent outline-none border-[1px] border-white/25 rounded-md p-2'
                value={userInfo.name}
                onChange={handleNameChange}
              />
              <p className='text-white/50'>{`${savedMixes.length} ${
                savedMixes.length > 1 || savedMixes.length == 0
                  ? 'mixes'
                  : 'mix'
              }`}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          <h2 className='text-2xl font-semibold'>Settings</h2>
          <div className='flex flex-col gap-2'>
            <p className='text-white/50'>Select Theme:</p>
            <div className='grid grid-rows-2 grid-cols-3 gap-2 self-start'>
              {themes.map((theme) => (
                <ThemeButton key={theme} theme={theme} />
              ))}
              <button className='w-14 h-14 rounded-md bg-neutral-800 flex items-center justify-center text-xl'>
                <i className='fa-solid fa-plus'></i>
              </button>
            </div>
          </div>

          <div className='flex w-full gap-4'>
            <button
              className='bg-neutral-800 rounded-md p-3 flex-1 flex gap-2 items-center justify-center'
              onClick={handleExport}
            >
              <i className='fa-solid fa-file-export'></i>
              Export
            </button>
            <button className='bg-neutral-800 rounded-md p-3 flex-1 flex gap-2 items-center justify-center'>
              <i className='fa-solid fa-file-import'></i>
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
