import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import ThemeButton from "./ThemeButton";
import { v4 as uuidv4 } from "uuid";
import { writeTextFile, BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { save, open } from "@tauri-apps/api/dialog";
import { isValidSoundScapeArray } from "../../utilities/importValidation";

const SettingsModal = () => {
  const {
    setShowSettingsModal,
    restoreDefaults,
    savedSoundscapes,
    setSavedSoundscapes,
    user,
    setUser,
    themes,
  } = useAppContext();

  const [newUsername, setNewUsername] = useState(user.username);

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleClose = () => {
    setShowSettingsModal(false);
  };

  const handleReset = () => {
    restoreDefaults();
  };

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      username: newUsername ? newUsername : "User",
    }));
    setShowSettingsModal(false);
  };

  const handleExport = async () => {
    const jsonString = JSON.stringify(savedSoundscapes, null, 2);

    const filePath = await save({
      defaultPath: `SoundScapes-${uuidv4()}.json`,
      filters: [
        {
          name: "JSON",
          extensions: ["json"],
        },
      ],
    });

    if (filePath) {
      await writeTextFile(filePath, jsonString, {
        dir: BaseDirectory.Download,
      });
      toast(
        `Exported ${savedSoundscapes.length} ${
          savedSoundscapes.length === 1 ? "SoundScape" : "SoundScapes"
        }!`,
      );
    }
  };

  const handleImport = async () => {
    try {
      const selectedFile = await open({
        filters: [
          {
            name: "JSON",
            extensions: ["json"],
          },
        ],
        multiple: false,
        directory: false,
      });

      if (selectedFile) {
        const fileContents = await readTextFile(selectedFile, {
          dir: BaseDirectory.Download,
        });
        const importedData = JSON.parse(fileContents);

        if (isValidSoundScapeArray(importedData)) {
          const combinedSoundScapes = [...savedSoundscapes, ...importedData];
          setSavedSoundscapes(combinedSoundScapes);
          toast(
            `Imported ${importedData.length} ${
              importedData.length === 1 ? "SoundScape" : "SoundScapes"
            }!`,
          );
        } else {
          toast("Invalid file format. Please upload a valid JSON file.");
          console.log("error", importedData);
        }
      }
    } catch (error) {
      toast("An error occurred while importing the file. Please try again.");
      console.log("error", error);
    }
  };

  return (
    <div
      onClick={handleClose}
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-xl"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-[680px] flex-col gap-8 rounded-md border-1 border-white/25 bg-neutral-900 p-8"
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 font-GeistMono opacity-50 hover:opacity-100"
        >
          <img src="/assets/img/icons/x.svg" className="h-6 w-6 invert" />
        </button>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="flex gap-8">
          <div className="flex flex-1 flex-col gap-4">
            <h2 className="text-lg">Profile</h2>
            <div className="h-28 w-28 self-center rounded-full bg-white"></div>
            <div className="flex flex-col gap-2">
              <p className="text-white/50">Username</p>
              <input
                type="text"
                value={newUsername}
                placeholder="Username"
                onChange={(e) => handleUsernameChange(e)}
                className="rounded-md border-1 border-white/25 bg-transparent p-2 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white/50">Avatar</p>
              <div className="flex gap-2">
                <button className="flex-1 rounded-md bg-neutral-800 p-2">
                  Upload
                </button>
                <button className="flex-1 rounded-md bg-neutral-800 p-2">
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <h2 className="text-lg">Theme</h2>
            <div className="flex flex-col items-start gap-2">
              <p className="text-white/50">Select theme:</p>
              <div className="grid grid-cols-3 grid-rows-2 gap-2">
                {themes.map((theme) => (
                  <ThemeButton theme={theme} key={theme} />
                ))}
                <button className="flex h-14 w-14 items-center justify-center rounded-md bg-neutral-800">
                  <img
                    src="/assets/img/icons/plus.svg"
                    className="h-6 w-6 invert"
                  />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg">
                SoundScapes{" "}
                <span className="font-GeistMono">{`(${savedSoundscapes.length})`}</span>
              </h2>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleImport}
                  className="rounded-md bg-neutral-800 p-2"
                >
                  Import
                </button>
                <button
                  onClick={handleExport}
                  className="rounded-md bg-neutral-800 p-2"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 rounded-md bg-neutral-800 p-2"
          >
            Save
          </button>
          <button
            onClick={handleClose}
            className="flex-1 rounded-md bg-neutral-800 p-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
