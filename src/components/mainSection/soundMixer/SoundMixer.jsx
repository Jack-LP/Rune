import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import SoundItem from "./SoundItem";

const SoundMixer = () => {
  const { sounds } = useContext(AppContext);

  return (
    <div className="row-span-2 flex w-full flex-col gap-8 rounded-md border-1 border-white/25 p-8">
      {sounds.map((sound) => (
        <SoundItem key={sound} soundName={sound} />
      ))}
    </div>
  );
};

export default SoundMixer;
