import { useAppContext } from "./context/AppContext";
import Welcome from "./components/welcome/Welcome";
import SideBar from "./components/sideBar/SideBar";
import MainSection from "./components/mainSection/MainSection";
import ControlBar from "./components/mainSection/controlBar/ControlBar";
import UserModal from "./components/user/UserModal";
import Theme from "./components/common/Theme";

function App() {
  const { showUserModal, user } = useAppContext();

  return (
    <>
      {user.isLoggedIn ? (
        <div className="hide-scrollbar relative flex h-screen overflow-y-scroll font-Geist text-white">
          <Theme />
          <div className='absolute inset-0 bg-[url("/assets/img/theme/bg-noise.png")] opacity-5'></div>
          <SideBar />
          {showUserModal && <UserModal />}
          <div className="relative flex w-full p-16 pb-28">
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
