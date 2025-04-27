import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const prevSongRef = useRef<string | null>(null);

	const { currentSong, isPlaying, playNext } = usePlayerStore();

	useEffect(() => {
		if (isPlaying) audioRef.current?.play();
		else audioRef.current?.pause();
	}, [isPlaying]);

	useEffect(() => {
		const audio = audioRef.current;

		const handleEnded = () => {
			playNext();
		};

		audio?.addEventListener("ended", handleEnded);

		return () => audio?.removeEventListener("ended", handleEnded);
	}, [playNext]);

	useEffect(() => {
		const audio = audioRef.current;

		if (!audio || !currentSong) return;

		const audioUrl = currentSong.audioUrl ?? ""; // fallback
		const isSongChange = prevSongRef.current !== audioUrl;

		if (isSongChange) {
			audio.src = audioUrl;
			audio.currentTime = 0;
			prevSongRef.current = audioUrl;

			if (isPlaying) audio.play();
		}
	}, [currentSong, isPlaying]);

	return <audio ref={audioRef} />;
};

export default AudioPlayer;

