import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

const CreationModal = ({ setShowModal }) => {
  const [color, setColor] = useState("#3d7d6e");

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div
      onClick={handleClose}
      className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-xl"
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
            <p>New Mix</p>
            <p className="text-sm text-white/50">
              <span className="font-GeistMono">0</span> sounds
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p>Name</p>
          <input
            type="text"
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
          <button className="flex flex-1 items-center justify-center rounded-md bg-neutral-800 p-3">
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
