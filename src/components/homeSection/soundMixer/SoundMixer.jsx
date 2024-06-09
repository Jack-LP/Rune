import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import SoundItem from "./SoundItem";

const SoundMixer = () => {
  const { sounds } = useContext(AppContext);

  return (
    <div className="row-span-2 flex flex-col items-start rounded-md border-1 border-white/25 p-8 pt-14 backdrop-blur-lg">
      <div className="absolute left-0 top-0 flex w-full items-center gap-2 border-b-1 border-white/25 px-2 py-2 text-sm">
        <div className="border-r-1 border-white/50 pr-2">
          <img src="/assets/img/icons/bars.svg" className="icon" />
        </div>
        <p>Mixer</p>
      </div>
      <div className="flex w-full flex-col gap-8">
        {sounds.map((sound, index) => (
          <SoundItem key={sound} soundName={sound} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SoundMixer;
