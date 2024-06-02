import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { HexColorPicker, HexColorInput } from "react-colorful";

const CreationModal = ({ setShowModal }) => {
  const { createSoundscape, currentVolumes } = useContext(AppContext);

  const [color, setColor] = useState("#3d7d6e");
  const [name, setName] = useState("New SoundScape");
  const [numberOfSounds, setNumberOfSounds] = useState(0);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSave = () => {
    const soundScapeName = name || "New SoundScape";
    createSoundscape(soundScapeName, color);
    handleClose();
  };

  useEffect(() => {
    setNumberOfSounds(
      Object.keys(currentVolumes).filter((key) => currentVolumes[key] > 0)
        .length,
    );
  }, [currentVolumes]);

  return (
    <div
      onClick={handleClose}
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-xl"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-[480px] flex-col gap-8 rounded-md border-1 border-white/25 bg-neutral-900 p-8"
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 font-GeistMono"
        >
          X
        </button>
        <h1 className="text-2xl font-semibold">Create SoundScape</h1>
        <div className="flex items-center gap-3 rounded-md bg-neutral-800 px-4 py-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
          <div className="flex flex-col">
            <p>{name ? name : "New SoundScape"}</p>
            <p className="text-sm text-white/50">
              <span className="font-GeistMono">{numberOfSounds}</span>{" "}
              {`${numberOfSounds === 1 ? "sound" : "sounds"}`}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p>Name</p>
          <input
            type="text"
            value={name}
            placeholder="New SoundScape"
            onChange={(e) => handleNameChange(e)}
            className="rounded-md border-1 border-white/25 bg-transparent p-2 outline-none"
          />
        </div>
        <div className="flex w-full flex-col gap-4">
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
        <div className="flex gap-4">
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

export default CreationModal;
