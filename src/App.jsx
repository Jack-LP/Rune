import SideBar from "./components/sidebar/SideBar";
import MainSection from "./components/mainSection/MainSection";

function App() {
  return (
    <div className="flex h-screen overflow-y-scroll bg-neutral-900 font-Geist text-white">
      <SideBar />
      <div className="flex w-full bg-neutral-900 p-28">
        <MainSection />
      </div>
    </div>
  );
}

export default App;
