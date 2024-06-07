import { useAppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Welcome from "./components/welcome/Welcome";
import SideBar from "./components/sideBar/SideBar";
import MainSection from "./components/mainSection/MainSection";
import VideoSection from "./components/videoSection/VideoSection";
import ControlBar from "./components/mainSection/controlBar/ControlBar";
import SettingsModal from "./components/settings/SettingsModal";
import Theme from "./components/common/Theme";

function App() {
  const { showSettingsModal, user, currentTab } = useAppContext();

  return (
    <>
      {!user.isLoggedIn ? (
        <Welcome />
      ) : (
        <div className="relative flex h-screen font-Geist text-white">
          <Theme />
          <div className='absolute inset-0 bg-[url("/assets/img/theme/bg-noise.png")] opacity-5'></div>
          <SideBar />
          {showSettingsModal && <SettingsModal />}
          <div className="relative flex w-full p-16 pb-28">
            <MainSection />
            <VideoSection />
            <ControlBar />
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={true}
        theme="dark"
      />
    </>
  );
}

export default App;
