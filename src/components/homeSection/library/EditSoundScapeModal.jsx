import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { HexColorPicker, HexColorInput } from "react-colorful";
import ModalOverlay from "../../common/ModalOverlay";

const EditSoundScapeModal = ({ soundScape, setShowEditModal }) => {
  const { setSavedSoundscapes, sounds } = useAppContext();

  const [name, setName] = useState(soundScape.name);
  const [color, setColor] = useState(soundScape.color);
  const [newVolumes, setNewVolumes] = useState(soundScape.sounds);

  const handleSave = () => {
    const updatedSoundScape = {
      ...soundScape,
      name: name ? name : "New SoundScape",
      color,
      sounds: newVolumes,
    };
    setSavedSoundscapes((prev) =>
      prev.map((item) =>
        item.id === soundScape.id ? updatedSoundScape : item,
      ),
    );
    handleClose();
  };

  const handleClose = () => {
    setShowEditModal(false);
  };

  const handleVolumeChange = (e, soundName) => {
    const newVolume = parseFloat(e.target.value);
    setNewVolumes((prev) => ({
      ...prev,
      [soundName]: newVolume,
    }));
  };

  return (
    <ModalOverlay onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-[680px] flex-col gap-8 rounded-md border-1 border-white/25 bg-neutral-900 p-8 pt-16"
      >
        <div className="absolute left-0 top-0 flex w-full items-center gap-2 border-b-1 border-white/25 px-2 py-2 text-sm text-white/50">
          <div className="border-r-1 border-white/50 pr-2">
            <img src="/assets/img/icons/edit.svg" className="icon" />
          </div>
          <p>Edit SoundScape</p>
          <button
            onClick={handleClose}
            className="ml-auto font-GeistMono opacity-50 hover:opacity-100"
          >
            <img src="/assets/img/icons/x.svg" className="size-5 invert" />
          </button>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p>Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New SoundScape"
                className="rounded-md border-1 border-white/25 bg-transparent p-2 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p>Color</p>
              <HexColorPicker
                color={color}
                onChange={setColor}
                style={{ width: "100%" }}
              />
              <HexColorInput
                color={color}
                onChange={setColor}
                prefixed={true}
                className="rounded-md border-1 border-white/25 bg-transparent p-2 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleSave}
                className="flex flex-1 items-center justify-center rounded-md bg-neutral-800 p-3"
              >
                Save
              </button>
              <button
                onClick={handleClose}
                className="flex flex-1 items-center justify-center rounded-md bg-neutral-800 p-3"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <p>Sounds</p>
            {sounds.map((soundName) => (
              <div key={soundName} className="flex items-center gap-2">
                <div className="size-10 flex-shrink-0 rounded-md border-1"></div>
                <div className="flex w-full flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold capitalize">
                      {soundName}
                    </p>
                    <p className="font-GeistMono text-xs text-white/50">
                      {parseFloat(newVolumes[soundName]).toFixed(2)}
                    </p>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={newVolumes[soundName]}
                    onChange={(e) => handleVolumeChange(e, soundName)}
                    className="cursor-pointer accent-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default EditSoundScapeModal;
