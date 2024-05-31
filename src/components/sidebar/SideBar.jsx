import React from "react";
import MenuButton from "./MenuButton";
import ItemButton from "./ItemButton";

const SideBar = () => {
  return (
    <>
      <div className="flex h-full w-[250px] flex-col items-center border-r-1 border-white border-white/25 px-4">
        <div className="flex w-full justify-center border-b-1 border-white/25 py-4">
          <h1 className="text-xl font-semibold">App Name</h1>
        </div>
        <div className="flex w-full flex-col border-b-1 border-white/25 py-4">
          <MenuButton>
            <p>Home</p>
          </MenuButton>
          <MenuButton>
            <p>Reset</p>
          </MenuButton>
          <MenuButton>
            <p>Random</p>
          </MenuButton>
        </div>
        <div className="flex w-full flex-col py-4">
          <button className="flex w-full gap-2 rounded-md p-1 hover:bg-white/10">
            Create New
          </button>
          <ItemButton />
          <ItemButton />
          <ItemButton />
          <ItemButton />
          <ItemButton />
        </div>
      </div>
      <p className="fixed bottom-2 left-2 font-GeistMono text-xs text-white/25">
        @Jack-LP // <a href="https://github.com/Jack-LP/Rune">source</a>
      </p>
    </>
  );
};

export default SideBar;
