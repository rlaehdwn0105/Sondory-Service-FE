import { useEffect, useRef } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import PlayButton from "./PlayButton";
import LikeButton from "./LikeButton";

const AllSongs = () => {
  const { AllSongs, error, fetchAllSongs } = useMusicStore();
  const { user } = useAuthStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAllSongs();
  }, [fetchAllSongs]);

  if (error) return <p className="text-red-500 mb-4 text-lg">{error}</p>;

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative mb-8">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-2xl font-bold text-white">Explore All Songs</h2>
        <Link
          to="/songs"
          className="text-sm text-zinc-300 hover:text-white hover:underline"
        >
          View All
        </Link>
      </div>

      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 hover:bg-black p-2 rounded-full"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      <div
        ref={containerRef}
        className="flex overflow-x-auto space-x-4 pb-2 px-6 scroll-smooth no-scrollbar"
      >
        {AllSongs.slice(0, 20).map((song) => {
          const isLiked = !!song.Likers?.some((liker) => liker.id === user?.id);
          const isMe = user?.id === song.User?.id;

          return (
            <div
              key={song.id}
              className="group relative min-w-[180px] rounded-md space-y-1"
            >
              <div className="relative rounded-md overflow-hidden shadow-sm group">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

                <PlayButton song={song} />
                <LikeButton songId={song.id} initiallyLiked={isLiked} />
              </div>

              <span className="text-white font-semibold text-sm px-1 truncate block">
                {song.title}
              </span>

              {song.User?.id && (
                isMe ? (
                  <span className="text-sm text-zinc-400 font-semibold px-1 block truncate">
                    {song.User.username}
                  </span>
                ) : (
                  <Link
                    to={`/user/${song.User.id}`}
                    className="text-sm text-zinc-400 font-semibold px-1 hover:underline block truncate"
                  >
                    {song.User.username}
                  </Link>
                )
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 hover:bg-black p-2 rounded-full"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default AllSongs;
