import { useAppContext } from "../../context/AppContext";

const Theme = () => {
  const { user, themes } = useAppContext();
  const theme = user.theme;

  if (theme === "default") {
    return <div className="fixed -z-20 h-screen w-screen bg-neutral-900" />;
  }
  if (themes.includes(theme)) {
    return (
      <img
        src={`/assets/img/theme/${theme}.jpg`}
        alt=""
        className="fixed -z-20 h-screen w-screen object-cover brightness-[.3]"
      />
    );
  }
};

export default Theme;
