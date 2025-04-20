import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import PlayButton from "./components/PlayButton";
import LikeButton from "./components/LikeButton";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

const AllSongsPage = () => {
  const { AllSongs, fetchAllSongs, error } = useMusicStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchAllSongs();
  }, [fetchAllSongs]);

  if (error) return <p className="text-red-500 text-lg">{error}</p>;

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-6 text-white">All Songs</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {AllSongs.map((song) => {
          const isLiked = !!song.Likers?.some((liker) => liker.id === user?.id);
          const isMe = user?.id === song.User?.id;

          return (
            <div key={song.id} className="space-y-2 group">
              <div className="relative rounded-md overflow-hidden shadow-sm group">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                <PlayButton song={song} />
                <LikeButton songId={song.id} initiallyLiked={isLiked} />
              </div>

              <div className="space-y-0.5 px-1">
                <p className="text-white font-semibold text-sm truncate">
                  {song.title}
                </p>

                {song.User?.username && (
                  isMe ? (
                    <p className="text-sm text-zinc-400 font-semibold truncate">
                      {song.User.username}
                    </p>
                  ) : (
                    <Link
                      to={`/user/${song.User.id}`}
                      className="text-sm text-zinc-400 font-semibold truncate hover:underline hover:text-white transition"
                    >
                      {song.User.username}
                    </Link>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllSongsPage;
