import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useMusicStore } from "@/stores/useMusicStore";

interface LikeButtonProps {
  songId: string;
  initiallyLiked: boolean;
  initialCount?: number; 
}

const LikeButton = ({ songId, initiallyLiked, initialCount }: LikeButtonProps) => {
  const [liked, setLiked] = useState(initiallyLiked);
  const [likeCount, setLikeCount] = useState(initialCount ?? 0);
  const { likeSong, unlikeSong, fetchmyLikedSongs } = useMusicStore();

  useEffect(() => {
    setLiked(initiallyLiked);
    if (typeof initialCount === "number") {
      setLikeCount(initialCount);
    }
  }, [initiallyLiked, initialCount]);

  const handleToggleLike = async () => {
    const newLikedState = !liked;
    setLiked(newLikedState);

    if (typeof initialCount === "number") {
      setLikeCount((prev) => prev + (newLikedState ? 1 : -1));
    }
    const result = newLikedState ? await likeSong(songId) : await unlikeSong(songId);

    if (result !== newLikedState) {
      setLiked(!newLikedState);
      if (typeof initialCount === "number") {
        setLikeCount((prev) => prev + (!newLikedState ? 1 : -1));
      }
    }
    await fetchmyLikedSongs();
  };

  if (typeof initialCount === "number") {
    return (
      <button
        onClick={handleToggleLike}
        aria-label={liked ? "Unlike song" : "Like song"}
        className="flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded-md"
      >
        <Heart
          className={`w-4 h-4 transition ${
            liked ? "text-yellow-400 fill-yellow-400" : "text-zinc-400"
          }`}
        />
        <span className="text-sm text-yellow-400 font-bold">{likeCount}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleLike}
      aria-label={liked ? "Unlike" : "Like"}
      className="absolute bottom-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <Heart
        size={16}
        className={`transition-all duration-200 ${
          liked ? "text-yellow-400 fill-yellow-400" : "text-black fill-black"
        }`}
      />
    </button>
  );
};

export default LikeButton;
