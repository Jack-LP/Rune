import React from "react";

const MenuButton = ({ children, func, currentTab }) => {
  const isActive = currentTab === children[1].props.children.toLowerCase();

  return (
    <button
      onClick={func}
      className={`flex w-full items-center gap-2 rounded-md p-2 hover:bg-white/10 ${isActive ? "bg-black/30" : ""}`}
    >
      {children}
    </button>
  );
};

export default MenuButton;
