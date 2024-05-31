import SideBar from "./components/sidebar/SideBar";
import MainSection from "./components/mainSection/MainSection";
import ControlBar from "./components/mainSection/controlBar/ControlBar";

function App() {
  return (
    <div className="flex h-screen overflow-y-scroll bg-neutral-900 font-Geist text-white">
      <SideBar />
      <div className="relative flex w-full bg-neutral-900 p-28">
        <MainSection />
        <ControlBar />
      </div>
    </div>
  );
}

export default App;
