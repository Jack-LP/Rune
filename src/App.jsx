import { useAppContext } from "./context/AppContext";
import Welcome from "./components/welcome/Welcome";
import SideBar from "./components/sideBar/SideBar";
import MainSection from "./components/mainSection/MainSection";
import ControlBar from "./components/mainSection/controlBar/ControlBar";
import UserModal from "./components/user/UserModal";

function App() {
  const { showUserModal, user } = useAppContext();

  return (
    <>
      {user.isLoggedIn ? (
        <div className="hide-scrollbar relative flex h-screen overflow-y-scroll bg-neutral-900 font-Geist text-white">
          <SideBar />
          {showUserModal && <UserModal />}
          <div className="relative flex w-full bg-neutral-900 p-16 pb-28">
            <MainSection />
            <ControlBar />
          </div>
        </div>
      ) : (
        <Welcome />
      )}
    </>
  );
}

export default App;
