import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

const PlayButton = ({ song }: { song: Song }) => {
	const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
	const isCurrentSong = currentSong?.id === song.id && !!currentSong.audioUrl;

	const handlePlay = () => {
		if (isCurrentSong) togglePlay();
		else setCurrentSong(song);
	}

	return (
		<Button
			size="icon"
			onClick={handlePlay}
			className={`
				bg-white text-black rounded-full shadow-lg
				w-12 h-12 sm:w-14 sm:h-14 
				absolute inset-0 m-auto
				hover:scale-105 transition-all
				opacity-0 group-hover:opacity-100
			`}
		>
			{isCurrentSong && isPlaying ? (
				<Pause className="w-5 h-5" />
			) : (
				<Play className="w-5 h-5" />
			)}
		</Button>
	);
};

export default PlayButton;
