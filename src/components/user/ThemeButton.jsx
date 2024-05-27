import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const ThemeButton = ({ theme }) => {
  const { setUserInfo } = useContext(AppContext);

  const handleOnClick = () => {
    setUserInfo((prev) => ({ ...prev, theme: theme }));
  };

  return (
    <button
      className='w-14 h-14 rounded-md bg-neutral-800 text-xs flex items-center justify-center'
      onClick={handleOnClick}
    >
      {theme}
    </button>
  );
};

export default ThemeButton;
