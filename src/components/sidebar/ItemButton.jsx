import React from "react";

const ItemButton = ({ item }) => {
  return (
    <button className="flex w-full items-center gap-2 rounded-md px-2 py-1 hover:bg-white/10">
      <div
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: item.color }}
      ></div>
      {item.name}
    </button>
  );
};

export default ItemButton;
