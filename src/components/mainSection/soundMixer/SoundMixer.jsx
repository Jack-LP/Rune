import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import SoundItem from "./SoundItem";

const SoundMixer = () => {
  const { sounds } = useContext(AppContext);

  return (
    <div className="row-span-2 flex flex-col items-start rounded-md border-1 border-white/25">
      <div className="flex w-full gap-4 border-b-1 border-white/25 px-8 py-2 text-white/50">
        <p>#</p>
        <p>sound</p>
        <p>solo</p>
        <p>visualiser</p>
      </div>
      <div className="flex flex-col gap-8 p-8">
        {sounds.map((sound, index) => (
          <SoundItem key={sound} soundName={sound} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SoundMixer;
