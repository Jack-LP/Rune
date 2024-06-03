import { useAppContext } from "../../context/AppContext";

const ThemeButton = ({ theme }) => {
  const { setUser } = useAppContext();

  const handleChangeTheme = () => {
    setUser((prev) => ({ ...prev, theme }));
  };

  return (
    <button
      className="flex h-14 w-14 items-center justify-center rounded-md bg-neutral-800 text-xs"
      onClick={handleChangeTheme}
    >
      {theme}
    </button>
  );
};

export default ThemeButton;
