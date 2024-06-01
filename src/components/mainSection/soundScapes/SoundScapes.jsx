import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const SoundScapes = () => {
  const { presets } = useContext(AppContext);

  return (
    <div className="hide-scrollbar flex w-full flex-col gap-4 overflow-y-scroll rounded-md border-1 border-white/25 p-8">
      <h1 className="text-lg font-semibold">SoundScapes</h1>
      <div className="flex flex-col gap-2">
        <p className="text-white/50">Presets</p>
        <div className="flex gap-2">
          {presets.map((item) => (
            <button key={item.id} className="h-14 w-14 rounded-md border-1">
              {item.id}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-white/50">Your library</p>
        <div className="flex flex-wrap gap-2">
          <div className="h-14 w-14 rounded-md border-1"></div>
          <div className="h-14 w-14 rounded-md border-1"></div>
          <div className="h-14 w-14 rounded-md border-1"></div>
          <div className="h-14 w-14 rounded-md border-1"></div>
          <div className="h-14 w-14 rounded-md border-1"></div>
          <div className="h-14 w-14 rounded-md border-1"></div>
          <div className="h-14 w-14 rounded-md border-1"></div>
          <div className="h-14 w-14 rounded-md border-1"></div>
          <div className="h-14 w-14 rounded-md border-1"></div>
          <div className="h-14 w-14 rounded-md border-1"></div>
        </div>
      </div>
    </div>
  );
};

export default SoundScapes;
