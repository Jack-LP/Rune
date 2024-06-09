import { useState } from "react";
import { useAppContext } from "../../context/AppContext";

const WelcomeCard = () => {
  const { setUser, user } = useAppContext();

  const [username, setUsername] = useState("User");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = () => {
    setUser((prev) => ({
      ...prev,
      username,
      isLoggedIn: true,
    }));
  };

  console.log(user.avatar);

  return (
    <div className="flex w-[800px] rounded-lg border-1 border-white/25">
      <div className="flex flex-1 flex-col gap-8 rounded-l-lg bg-neutral-900 p-6">
        <h1 className="self-center text-2xl font-semibold">Welcome!</h1>
        <div className="flex flex-col gap-4">
          <h2 className="text-white/50">Profile</h2>
          <div className="flex items-center gap-2">
            <img
              src={user.avatar || "/assets/img/icons/user.svg"}
              className="size-20 rounded-full"
            />
            <input
              type="text"
              placeholder="Username"
              className="rounded-md border-1 border-white/25 bg-transparent p-2 outline-none"
              onChange={(e) => handleUsernameChange(e)}
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
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
        <button
          onClick={handleSubmit}
          className="rounded-md bg-neutral-800 p-3"
        >
          Enter
        </button>
      </div>
      <div className="flex flex-1 rounded-r-lg bg-black/10 p-6 backdrop-blur-lg"></div>
    </div>
  );
};

export default WelcomeCard;
