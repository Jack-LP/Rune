import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import MenuButton from "./MenuButton";
import SoundScapeButton from "./SoundScapeButton";
import CreationModal from "./CreationModal";

const SideBar = () => {
  const {
    savedSoundscapes,
    presets,
    resetVolumes,
    randomiseVolumes,
    user,
    setShowSettingsModal,
    currentTab,
    setCurrentTab,
  } = useAppContext();

  const [showModal, setShowModal] = useState(false);

  const handleCreateNew = () => {
    setShowModal(true);
  };

  const handleOpenSettings = () => {
    setShowSettingsModal(true);
  };

  return (
    <>
      {showModal && <CreationModal setShowModal={setShowModal} />}
      <div className="flex h-full w-[250px] flex-col border-r-1 border-white/25 backdrop-blur-lg">
        <div className="flex flex-col items-center px-4">
          <div className="flex w-full justify-center border-b-1 border-white/25 py-4">
            <h1 className="text-xl font-semibold">Soundscapes</h1>
          </div>
          <div className="flex w-full flex-col border-b-1 border-white/25 py-4">
            <MenuButton
              func={() => setCurrentTab("home")}
              currentTab={currentTab}
            >
              <img src="/assets/img/icons/home.svg" className="icon" />
              <p>Home</p>
            </MenuButton>
            <MenuButton
              func={() => setCurrentTab("video")}
              currentTab={currentTab}
            >
              <img src="/assets/img/icons/video.svg" className="icon" />
              <p>Video</p>
            </MenuButton>
          </div>
          <div className="flex w-full flex-col border-b-1 border-white/25 py-4">
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
            <div className="hide-scrollbar flex max-h-[650px] flex-col overflow-y-scroll">
              {presets.map((soundScape) => (
                <SoundScapeButton key={soundScape.id} soundScape={soundScape} />
              ))}
              {savedSoundscapes &&
                savedSoundscapes.map((soundScape) => (
                  <SoundScapeButton
                    key={soundScape.id}
                    soundScape={soundScape}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="mt-auto flex w-full items-center gap-2 border-t-1 border-white/25 px-4 py-3">
          <img src={user.avatar} className="size-8 rounded-full"></img>
          <div className="flex flex-col">
            <p>{user.username}</p>
            <p className="text-xs text-white/50">
              <span className="font-GeistMono">{savedSoundscapes.length}</span>{" "}
              {savedSoundscapes.length === 1 ? "soundscape" : "soundscapes"}
            </p>
          </div>
          <button className="ml-auto" onClick={handleOpenSettings}>
            <img src="/assets/img/icons/gear.svg" className="icon" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
