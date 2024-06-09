import { useAppContext } from "../../context/AppContext";
import SoundMixer from "./soundMixer/SoundMixer";
import Library from "./library/Library";

const HomeSection = () => {
  const { currentTab } = useAppContext();

  return (
    <>
      <div
        className={`w-full grid-cols-2 grid-rows-2 gap-8 rounded-md ${currentTab === "home" ? "grid" : "hidden"}`}
      >
        <SoundMixer />
        <Library />
        <div className="w-full rounded-md border-1 border-white/25 backdrop-blur-lg"></div>
      </div>
    </>
  );
};

export default HomeSection;
