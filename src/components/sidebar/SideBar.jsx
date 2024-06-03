import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import MenuButton from "./MenuButton";
import SoundScapeButton from "./SoundScapeButton";
import CreationModal from "./CreationModal";

const SideBar = () => {
  const { savedSoundscapes, presets, resetVolumes, randomiseVolumes } =
    useAppContext();

  const [showModal, setShowModal] = useState(false);

  const handleCreateNew = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal && <CreationModal setShowModal={setShowModal} />}
      <div className="flex h-full w-[250px] flex-col items-center border-r-1 border-white border-white/25 px-4">
        <div className="flex w-full justify-center border-b-1 border-white/25 py-4">
          <h1 className="text-xl font-semibold">Soundscapes</h1>
        </div>
        <div className="flex w-full flex-col border-b-1 border-white/25 py-4">
          <MenuButton>
            <img src="/assets/img/icons/home.svg" className="icon" />
            <p>Home</p>
          </MenuButton>
          <MenuButton func={resetVolumes}>
            <img src="/assets/img/icons/reset.svg" className="icon" />
            <p>Reset</p>
          </MenuButton>
          <MenuButton func={randomiseVolumes}>
            <img src="/assets/img/icons/shuffle.svg" className="icon" />
            <p>Random</p>
          </MenuButton>
        </div>
        <div className="flex w-full flex-col py-4">
          <button
            className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-white/10"
            onClick={handleCreateNew}
          >
            <img src="/assets/img/icons/plus.svg" className="icon" />
            Create New
          </button>
          {}
          {presets.map((soundScape) => (
            <SoundScapeButton key={soundScape.id} soundScape={soundScape} />
          ))}
          {savedSoundscapes &&
            savedSoundscapes.map((soundScape) => (
              <SoundScapeButton key={soundScape.id} soundScape={soundScape} />
            ))}
        </div>
      </div>
      <p className="fixed bottom-2 left-2 font-GeistMono text-xs text-white/25">
        @Jack-LP // <a href="https://github.com/Jack-LP/Rune">source</a>
      </p>
    </>
  );
};

export default SideBar;
