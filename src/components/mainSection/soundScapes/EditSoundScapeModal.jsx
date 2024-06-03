import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { HexColorPicker, HexColorInput } from "react-colorful";

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
    <div
      onClick={handleClose}
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-lg"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-[680px] flex-col gap-8 rounded-md border-1 border-white/25 bg-neutral-900 p-8"
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 font-GeistMono opacity-50 hover:opacity-100"
        >
          <img src="/assets/img/icons/x.svg" className="h-6 w-6 invert" />
        </button>
        <h1 className="text-2xl font-semibold">Edit SoundScape</h1>
        <div className="flex gap-6">
          <div className="flex flex-1 flex-col gap-4">
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
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <p>Sounds</p>
            {sounds.map((soundName) => (
              <div key={soundName} className="flex items-center gap-2">
                <div className="h-10 w-10 cursor-pointer rounded-md border-1"></div>
                <div className="flex flex-col">
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
                    value={newVolumes[soundName]} // Use value from state
                    onChange={(e) => handleVolumeChange(e, soundName)} // Pass soundName to the handler
                    className="cursor-pointer accent-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
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
    </div>
  );
};

export default EditSoundScapeModal;
