import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { useAuthStore } from "@/stores/useAuthStore";
import PlayButton from "@/pages/home/components/PlayButton";
import LikeButton from "@/pages/home/components/LikeButton";
import { Link } from "react-router-dom";

const RecentSongsPage = () => {
  const { userRecentSongs, fetchRecentsSong } = useMusicStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchRecentsSong();
  }, [fetchRecentsSong]);

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Recently Played Songs</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {userRecentSongs.map((song) => {
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
                <span className="text-white font-semibold text-sm truncate">
                  {song.title}
                </span>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-zinc-400 font-semibold truncate">
                    {song.User?.username &&
                      (isMe ? (
                        <p>{song.User.username}</p>
                      ) : (
                        <Link
                          to={`/user/${song.User.id}`}
                          className="hover:underline hover:text-white transition"
                        >
                          {song.User.username}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentSongsPage;
