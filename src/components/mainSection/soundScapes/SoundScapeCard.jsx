import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const SoundScapeCard = ({ soundScape }) => {
  const { loadSoundScape } = useContext(AppContext);

  const handleClick = () => {
    loadSoundScape(soundScape);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 rounded-md border-1 border-white/25 px-2 py-3"
    >
      <div
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: soundScape.color }}
      ></div>
      <p>{soundScape.name}</p>
    </button>
  );
};

export default SoundScapeCard;
