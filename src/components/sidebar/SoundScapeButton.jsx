import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const SoundScapeButon = ({ soundScape }) => {
  const { loadSoundScape } = useContext(AppContext);

  const handleClick = () => {
    loadSoundScape(soundScape);
  };
  return (
    <button
      onClick={handleClick}
      className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-white/10"
    >
      <div
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: soundScape.color }}
      ></div>
      {soundScape.name}
    </button>
  );
};

export default SoundScapeButon;
