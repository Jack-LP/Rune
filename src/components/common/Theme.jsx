import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Theme = () => {
  const { userInfo, themes } = useContext(AppContext);
  const theme = userInfo.theme;

  if (theme === 'default') {
    return <div className='fixed w-screen h-screen -z-20 bg-neutral-800' />;
  }
  if (themes.includes(theme)) {
    return (
      <img
        src={`/assets/img/theme/${theme}.jpg`}
        alt=''
        className='fixed w-screen h-screen -z-20 blur-xl scale-110'
      />
    );
  }
  return (
    <img
      src={theme}
      alt=''
      className='fixed w-screen h-screen -z-20 blur-xl scale-110 object-cover'
    />
  );
};

export default Theme;
