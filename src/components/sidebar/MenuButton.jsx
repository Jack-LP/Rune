import React from "react";

const MenuButton = ({ children }) => {
  return (
    <button className="flex w-full gap-2 rounded-md px-2 py-1 hover:bg-white/10">
      {children}
    </button>
  );
};

export default MenuButton;
