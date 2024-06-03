import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditSoundScapeModal from "./EditSoundScapeModal";

const SoundScapeCard = ({ soundScape }) => {
  const { loadSoundScape, currentSoundScape } = useContext(AppContext);

  const [numberOfSounds, setNumberOfSounds] = useState(0);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentSoundScapeId, setCurrentSoundScapeId] = useState(0);

  const handleClick = () => {
    loadSoundScape(soundScape);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const getNumberOfSounds = () => {
    return Object.values(soundScape.sounds).filter((value) => value > 0).length;
  };

  useEffect(() => {
    setNumberOfSounds(getNumberOfSounds());
  }, []);

  useEffect(() => {
    if (currentSoundScape) {
      setCurrentSoundScapeId(currentSoundScape.id);
    } else {
      setCurrentSoundScapeId(0);
    }
  }, [currentSoundScape]);

  return (
    <>
      {showConfirmDelete && (
        <ConfirmDeleteModal
          soundScape={soundScape}
          setShowConfirmDelete={setShowConfirmDelete}
        />
      )}
      {showEditModal && (
        <EditSoundScapeModal
          soundScape={soundScape}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div
        className={`group flex items-center rounded-md border-1 border-white/25 ${currentSoundScapeId === soundScape.id ? "bg-neutral-800" : "bg-transparent"}`}
      >
        <button
          onClick={handleClick}
          className="flex w-full items-center gap-3 p-3"
        >
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: soundScape.color }}
          ></div>
          <div className="flex flex-col items-start">
            <p>{soundScape.name}</p>
            <p className="text-xs text-white/50">
              <span className="font-GeistMono">{numberOfSounds}</span>{" "}
              {numberOfSounds === 1 ? "sound" : "sounds"}
            </p>
          </div>
        </button>
        <div className="flex gap-2 px-3 opacity-0 transition duration-150 ease-in-out group-hover:opacity-100">
          <button onClick={handleEdit}>
            <img src="/assets/img/icons/edit.svg" className="h-5 w-5 invert" />
          </button>
          <button onClick={handleDelete}>
            <img src="/assets/img/icons/trash.svg" className="h-5 w-5 invert" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SoundScapeCard;
