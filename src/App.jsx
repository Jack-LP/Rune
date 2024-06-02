import { useAppContext } from "./context/AppContext";
import SideBar from "./components/sideBar/SideBar";
import MainSection from "./components/mainSection/MainSection";
import ControlBar from "./components/mainSection/controlBar/ControlBar";
import UserButton from "./components/user/UserButton";
import UserModal from "./components/user/UserModal";

function App() {
  const { showUserModal } = useAppContext();

  return (
    <div className="hide-scrollbar relative flex h-screen overflow-y-scroll bg-neutral-900 font-Geist text-white">
      <SideBar />
      <UserButton />
      {showUserModal && <UserModal />}
      <div className="relative flex w-full bg-neutral-900 p-28">
        <MainSection />
        <ControlBar />
      </div>
    </div>
  );
}

export default App;
