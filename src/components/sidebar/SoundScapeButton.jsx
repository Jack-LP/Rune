import { useAppContext } from "../../context/AppContext";

const SoundScapeButon = ({ soundScape }) => {
  const { loadSoundScape, currentSoundScape } = useAppContext();

  const handleClick = () => {
    loadSoundScape(soundScape);
  };
  return (
    <button
      onClick={handleClick}
      className={`flex w-full items-center gap-2 rounded-md p-2 hover:bg-white/10 ${currentSoundScape?.id === soundScape.id ? "bg-black/30" : ""}`}
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
