import React from "react";

const MenuButton = ({ children, func }) => {
  return (
    <button
      onClick={func && func}
      className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-white/10"
    >
      {children}
    </button>
  );
};

export default MenuButton;
