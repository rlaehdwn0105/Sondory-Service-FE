import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

const ListPlayButton = ({ song }: { song: Song }) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
  const isCurrent = currentSong?.id === song.id;

  const handleClick = () => {
    if (isCurrent) togglePlay();
    else setCurrentSong(song);
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      variant="ghost"
      className="bg-white text-black rounded-full shadow hover:scale-105 transition"
    >
      {isCurrent && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
    </Button>
  );
};

export default ListPlayButton;
