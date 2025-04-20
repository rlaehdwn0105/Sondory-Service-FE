import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import PlayButton from "../../pages/home/components/PlayButton";
import { Link } from "react-router-dom";

const RecentSongsPage = () => {
  const { userRecentSongs,fetchRecentsSong, myLikedSongs, fetchmyLikedSongs, error} = useMusicStore();

  useEffect(() => { fetchRecentsSong(); fetchmyLikedSongs();}, [fetchRecentsSong, fetchmyLikedSongs]);

  if (error) return <p className="text-red-500 text-lg">{error}</p>;

  return (
    <div className="px-6 py-8 space-y-10">
      <section className="space-y-2">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-semibold text-white">Listening History</h1>
          <Link to="/recent" className="text-sm text-zinc-400 hover:underline">
            View all
          </Link>
        </div>

        <ul className="space-y-2">
          {userRecentSongs.slice(0, 3).map((song) => (
            <li key={song.id} className="group flex gap-3 items-center">
              <div className="relative w-14 h-14 shrink-0">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-14 h-14 object-cover rounded-md"
                />
                <PlayButton song={song} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-white font-semibold text-sm truncate">{song.title}</p>
                <p className="text-sm text-zinc-400 font-semibold truncate">
                  {song.User?.username}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-white">Your Liked Songs</h2>
          <Link to="/liked" className="text-sm text-zinc-400 hover:underline">
            View all
          </Link>
        </div>

        <ul className="space-y-2">
          {myLikedSongs.slice(0, 3).map((song) => (
            <li key={song.id} className="group flex gap-3 items-center">
              <div className="relative w-14 h-14 shrink-0">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-14 h-14 object-cover rounded-md"
                />
                <PlayButton song={song} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-white font-semibold text-sm truncate">{song.title}</p>
                <p className="text-sm text-zinc-400 font-semibold truncate">
                  {song.User?.username}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RecentSongsPage;
