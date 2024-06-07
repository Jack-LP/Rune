import { useState, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import { isYouTubeUrl } from "../../utilities/importValidation";

const VideoSection = () => {
  const { currentTab } = useAppContext();

  const [input, setInput] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [showEmbed, setShowEmbed] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const containerRef = useRef(null);

  const getDimensions = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight - 39;

      return { width, height };
    }
  };

  const getVideoId = (url) => {
    let id = "";
    const idExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(idExp);

    if (match && match[2].length === 11) {
      id = match[2];
    }

    return id;
  };

  const handleSetEmbedUrl = (e) => {
    e.preventDefault();
    if (isYouTubeUrl(input)) {
      const videoId = getVideoId(input);
      setDimensions(getDimensions());
      setEmbedUrl(
        `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&color=white&iv_load_policy=3`,
      );
      setShowEmbed(true);
    }
  };

  const handleClearEmbedUrl = () => {
    setInput("");
    setEmbedUrl("");
    setShowEmbed(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full items-center justify-center overflow-hidden rounded-md border-1 border-white/25 backdrop-blur-lg ${currentTab === "video" ? "flex" : "hidden"}`}
    >
      <div className="absolute top-0 flex w-full items-center gap-2 border-b-1 border-white/25 px-2 py-2 text-white/50">
        <div className="border-r-1 border-white/50 pr-2">
          <img src="/assets/img/icons/video.svg" className="icon opacity-50" />
        </div>
        {showEmbed ? (
          <div className="items-cetner flex gap-2">
            <button onClick={handleClearEmbedUrl}>
              <img
                src="/assets/img/icons/trash.svg"
                className="icon opacity-50 hover:opacity-100"
              />
            </button>
            <p className="font-GeistMono text-sm">{input}</p>
          </div>
        ) : (
          <p className="font-GeistMono text-sm">soundscape://video-player</p>
        )}
      </div>
      {!showEmbed && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg">Add YouTube URL</p>
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => handleSetEmbedUrl(e)}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="rounded-md border-1 border-white/25 bg-transparent p-2 outline-none"
            />
            <button
              onClick={handleSetEmbedUrl}
              className="flex size-10 items-center justify-center rounded-md border-1 border-white/25 bg-transparent outline-none"
            >
              <img src="/assets/img/icons/plus.svg" className="size-5 invert" />
            </button>
          </form>
        </div>
      )}
      {showEmbed && (
        <div className="absolute bottom-0">
          <iframe
            src={embedUrl}
            width={dimensions.width}
            height={dimensions.height}
            allowFullScreen
            autoplay
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoSection;
