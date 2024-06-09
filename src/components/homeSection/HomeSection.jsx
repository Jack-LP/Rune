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
        <div className="w-full rounded-md border-1 border-white/25 backdrop-blur-lg">
          <div className="absolute left-0 top-0 flex w-full items-center gap-2 border-b-1 border-white/25 px-2 py-2 text-sm text-white/50">
            <div className="border-r-1 border-white/50 pr-2">
              <img src="/assets/img/icons/visualiser.svg" className="icon" />
            </div>
            <p>Visualiser</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSection;
