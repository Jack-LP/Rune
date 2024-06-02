import { useAppContext } from "../../context/AppContext";

const UserModal = () => {
  const { setShowUserModal } = useAppContext();

  const handleClose = () => {
    setShowUserModal(false);
  };

  return (
    <div
      onClick={handleClose}
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-xl"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-[480px] flex-col gap-8 rounded-md border-1 border-white/25 bg-neutral-900 p-8"
      >
        <h1 className="text-2xl font-semibold">Profile</h1>
        <div className="flex items-center gap-4">
          <div className="h-32 w-32 rounded-full bg-white"></div>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="rounded-md border-1 border-white/25 bg-transparent p-2"
            />
            <p>1 SoundScape</p>
          </div>
        </div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-white/50">Select Theme:</h2>
          <div className="grid grid-cols-3 grid-rows-2 gap-2">
            <div className="h-14 w-14 rounded-md bg-neutral-800"></div>
            <div className="h-14 w-14 rounded-md bg-neutral-800"></div>
            <div className="h-14 w-14 rounded-md bg-neutral-800"></div>
            <div className="h-14 w-14 rounded-md bg-neutral-800"></div>
            <div className="h-14 w-14 rounded-md bg-neutral-800"></div>
            <div className="h-14 w-14 rounded-md bg-neutral-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
