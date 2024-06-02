import { useAppContext } from "../../context/AppContext";

const UserButton = () => {
  const { setShowUserModal } = useAppContext();

  const openModal = () => {
    setShowUserModal(true);
  };

  return (
    <button
      onClick={openModal}
      className="absolute right-4 top-4 z-10 h-10 w-10 rounded-full bg-white"
    ></button>
  );
};

export default UserButton;
