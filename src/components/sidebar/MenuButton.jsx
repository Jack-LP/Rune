import React from "react";

const MenuButton = ({ children, func, currentTab }) => {
  const isActive = currentTab === children[1].props.children.toLowerCase();

  return (
    <button
      onClick={func}
      className={`hover:bg-white/10} flex w-full items-center gap-2 rounded-md p-2 ${isActive ? "bg-black/30" : ""}`}
    >
      {children}
    </button>
  );
};

export default MenuButton;
