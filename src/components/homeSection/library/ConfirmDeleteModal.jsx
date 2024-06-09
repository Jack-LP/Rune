import { useAppContext } from "../../../context/AppContext";
import ModalOverlay from "../../common/ModalOverlay";

const ConfirmDeleteModal = ({ setShowConfirmDelete, soundScape }) => {
  const { savedSoundscapes, setSavedSoundscapes } = useAppContext();

  const handleClose = () => {
    setShowConfirmDelete(false);
  };

  const handleDelete = () => {
    const updatedSoundscapes = savedSoundscapes.filter(
      (item) => item.id !== soundScape.id,
    );
    setSavedSoundscapes(updatedSoundscapes);
    handleClose();
  };

  return (
    <ModalOverlay onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-[480px] flex-col gap-8 rounded-md border-1 border-white/25 bg-neutral-900 p-8 pt-16"
      >
        <div className="absolute left-0 top-0 flex w-full items-center gap-2 border-b-1 border-white/25 px-2 py-2 text-sm text-white/50">
          <div className="border-r-1 border-white/50 pr-2">
            <img src="/assets/img/icons/trash.svg" className="icon" />
          </div>
          <p>Confirm Delete</p>
          <button
            onClick={handleClose}
            className="ml-auto font-GeistMono opacity-50 hover:opacity-100"
          >
            <img src="/assets/img/icons/x.svg" className="size-5 invert" />
          </button>
        </div>
        <p>Are you sure you want to delete this SoundScape?</p>
        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            className="flex flex-1 items-center justify-center rounded-md bg-neutral-800 p-3"
          >
            Delete
          </button>
          <button
            onClick={handleClose}
            className="flex flex-1 items-center justify-center rounded-md bg-neutral-800 p-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default ConfirmDeleteModal;
