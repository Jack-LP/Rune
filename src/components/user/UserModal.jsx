import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { writeTextFile, BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import { save, open } from '@tauri-apps/api/dialog';
import { v4 as uuidv4 } from 'uuid';
import { isValidMixArray } from '../../utilities/importValidation';
import ThemeButton from './ThemeButton';

const UserModal = () => {
  const {
    savedMixes,
    setSavedMixes,
    setShowUserModal,
    userInfo,
    setUserInfo,
    themes,
  } = useContext(AppContext);

  const handleNameChange = (e) =>
    setUserInfo((prev) => ({ ...prev, name: e.target.value }));

  const closeModal = () => setShowUserModal(false);

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

  const handleImport = async () => {
    try {
      const selectedFile = await open({
        filters: [
          {
            name: 'JSON',
            extensions: ['json'],
          },
        ],
        multiple: false,
        directory: false,
      });

      if (selectedFile) {
        const fileContents = await readTextFile(selectedFile, {
          dir: BaseDirectory.Download,
        });
        const importedMixes = JSON.parse(fileContents);

        if (isValidMixArray(importedMixes)) {
          const combinedMixes = [...savedMixes, ...importedMixes];
          setSavedMixes(combinedMixes);
          toast(
            `Imported ${importedMixes.length} ${
              importedMixes.length === 1 ? 'mix' : 'mixes'
            }!`
          );
        } else {
          toast('Invalid file format. Please upload a valid JSON file.');
        }
      }
    } catch (error) {
      toast('An error occurred while importing the file. Please try again.');
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      toast('Upload failed, file larger than 1.5Mb');
      return;
    }

    try {
      const base64 = await getBase64(file);
      setUserInfo((prev) => ({ ...prev, [type]: base64 }));
    } catch (error) {
      toast('Failed to upload image');
    }
  };

  return (
    <div
      className='inset-0 bg-neutral-950/75 backdrop-blur-md absolute z-20 flex items-center justify-center'
      onClick={closeModal}
    >
      <div
        className='bg-neutral-900 rounded-md p-8 flex flex-col gap-8 relative border-2 border-white/10'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute top-4 right-5 text-2xl text-white/50 hover:text-white'
          onClick={closeModal}
        >
          <i className='fa-solid fa-xmark'></i>
        </button>
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold'>Profile</h2>
          <div className='flex items-center gap-4'>
            <div className='relative'>
              <img
                src={userInfo.avatar}
                alt=''
                className='rounded-full w-32 h-32 object-cover'
              />
              <input
                type='file'
                id='avatarUpload'
                accept='image/*'
                onChange={(e) => handleImageUpload(e, 'avatar')}
                className='hidden'
              />
              <label
                htmlFor='avatarUpload'
                className='w-full cursor-pointer absolute top-0 h-full rounded-full'
              ></label>
            </div>
            <div className='flex flex-col gap-2'>
              <input
                type='text'
                maxLength={11}
                className='bg-transparent outline-none border-[1px] border-white/25 rounded-md p-2'
                placeholder='Username'
                value={userInfo.name}
                onChange={handleNameChange}
              />
              <p className='text-white/50'>
                <span className='font-GeistMono'>{savedMixes.length}</span>
                {` ${savedMixes.length === 1 ? 'mix' : 'mixes'}`}
              </p>
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
              <div className='relative'>
                <button className='w-14 h-14 rounded-md bg-neutral-800 flex items-center justify-center text-xl'>
                  <i className='fa-solid fa-plus'></i>
                </button>
                <input
                  type='file'
                  id='themeUpload'
                  onChange={(e) => handleImageUpload(e, 'theme')}
                  accept='image/*'
                  className='hidden'
                />
                <label
                  htmlFor='themeUpload'
                  className='w-full cursor-pointer absolute top-0 h-full rounded-md'
                ></label>
              </div>
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
            <button
              className='bg-neutral-800 rounded-md p-3 flex-1 flex gap-2 items-center justify-center'
              onClick={handleImport}
            >
              <i className='fa-solid fa-file-import'></i>
              Import
            </button>
          </div>
        </div>
        <p className='absolute bottom-2 right-5 text-xs text-white/10 select-none font-GeistMono'>
          rune v1.0.0
        </p>
      </div>
    </div>
  );
};

export default UserModal;
