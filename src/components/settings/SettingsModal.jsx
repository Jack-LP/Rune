import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import ThemeButton from "./ThemeButton";
import { v4 as uuidv4 } from "uuid";
import { writeTextFile, BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { save, open } from "@tauri-apps/api/dialog";
import { fetch, Body, getClient, ResponseType } from "@tauri-apps/api/http";
import { isValidSoundScapeArray } from "../../utilities/importValidation";
import ModalOverlay from "../common/ModalOverlay";
import { API_KEY } from "../../data/config";

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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

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

  const uploadToServer = async (base64, imageType) => {
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload`, {
        body: Body.form({
          key: API_KEY,
          image: base64,
        }),
        method: "POST",
        responseType: ResponseType.JSON,
      });

      const json = response.data;
      console.log(json);

      if (json.data && json.data.url) {
        const newUser = {
          ...user,
          avatar: imageType === "avatar" ? json.data.url : user.avatar,
          theme: imageType === "theme" ? json.data.url : user.theme,
        };
        setUser(newUser);
        toast(`Uploaded ${imageType}`);
      } else {
        toast("An error occurred while uploading the image.");
      }
    } catch (error) {
      console.error("Error uploading to server:", error);
      toast("An error occurred while uploading the image.");
    }
  };

  const handleImageUpload = async (e, imageType) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const base64 = await convertToBase64(file);
      uploadToServer(base64, imageType);
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
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
        }
      }
    } catch (error) {
      toast("An error occurred while importing the file. Please try again.");
    }
  };

  const removeAvatar = () => {
    setUser((prev) => ({
      ...prev,
      avatar: "",
    }));
  };

  return (
    <ModalOverlay onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-[680px] flex-col gap-8 rounded-md border-1 border-white/25 bg-neutral-900 p-8 pt-16"
      >
        <div className="absolute left-0 top-0 flex w-full items-center gap-2 border-b-1 border-white/25 px-2 py-2 text-sm text-white/50">
          <div className="border-r-1 border-white/50 pr-2">
            <img src="/assets/img/icons/gear.svg" className="icon" />
          </div>
          <p>Settings</p>
          <button
            onClick={handleClose}
            className="ml-auto font-GeistMono opacity-50 hover:opacity-100"
          >
            <img src="/assets/img/icons/x.svg" className="size-5 invert" />
          </button>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-1 flex-col gap-4">
            <h2 className="text-lg">Profile</h2>
            <img
              src={user.avatar || "/assets/img/icons/user.svg"}
              className="size-28 self-center rounded-full"
            ></img>
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
                <input
                  type="file"
                  accept="image/*"
                  id="avatarUpload"
                  onChange={(e) => handleImageUpload(e, "avatar")}
                  className="hidden"
                ></input>
                <label
                  htmlFor="avatarUpload"
                  className="flex-1 cursor-pointer rounded-md bg-neutral-800 p-2 text-center"
                >
                  Upload
                </label>
                <button
                  onClick={removeAvatar}
                  className="flex-1 rounded-md bg-neutral-800 p-2"
                >
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
                <input
                  type="file"
                  id="themeUpload"
                  onChange={(e) => handleImageUpload(e, "theme")}
                  className="hidden"
                />
                <label
                  htmlFor="themeUpload"
                  className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-md bg-neutral-800"
                >
                  <img
                    src="/assets/img/icons/plus.svg"
                    className="h-6 w-6 invert"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg">
                SoundScapes{" "}
                <span className="font-GeistMono text-sm text-white/50">{`(${savedSoundscapes.length})`}</span>
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
    </ModalOverlay>
  );
};

export default SettingsModal;
