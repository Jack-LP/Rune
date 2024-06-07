import { useAppContext } from "../../context/AppContext";

const Theme = () => {
  const { user, themes } = useAppContext();
  const theme = user.theme;

  if (theme === "default") {
    return <div className="fixed -z-20 h-screen w-screen bg-neutral-800" />;
  }
  if (themes.includes(theme)) {
    return (
      <img
        src={`/assets/img/theme/${theme}.jpg`}
        alt=""
        className="fixed -z-20 h-screen w-screen scale-110 blur-xl"
      />
    );
  }
  return (
    <img
      src={theme}
      alt=""
      className="fixed -z-20 h-screen w-screen scale-110 object-cover blur-xl"
    />
  );
};

export default Theme;
