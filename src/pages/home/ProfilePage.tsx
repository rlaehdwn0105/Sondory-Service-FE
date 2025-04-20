import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import ListPlayButton from "./components/ListPlayButton";
import { Trash2 } from "lucide-react";

const formatDuration = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
};

const MyUploadedSongsPage = () => {
  const { mySongs, fetchmySongs, deleteSong, error, fetchRecentsSong, fetchmyLikedSongs } = useMusicStore();
  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchmySongs();
  }, [fetchmySongs]);

  useEffect(() => {
    if (mySongs.length > 0) {
      initializeQueue(mySongs);
    }
  }, [mySongs]);

  const handleDelete = async (songId: string) => {
    if (confirm("Are you sure you want to delete this song?")) {
      await deleteSong(songId);
      await fetchmySongs();
      await fetchmyLikedSongs();
      await fetchRecentsSong();
    }
  };

  if (error) return <p className="text-red-500 text-lg">{error}</p>;

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">My Uploaded Songs</h1>

      <ul className="divide-y divide-zinc-700">
        {mySongs.map((song) => (
          <li
            key={song.id}
            className="flex items-center justify-between py-3 hover:bg-zinc-800/60 transition rounded-md px-2 group"
          >
            <div className="flex items-center gap-4">
              <img
                src={song.coverUrl}
                alt={song.title}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex flex-col">
                <span className="text-white font-semibold text-sm truncate">{song.title}</span>
                <span className="text-sm text-zinc-400 font-semibold truncate">
                  {song.User?.username || "Unknown Uploader"}
                </span>
                <span className="text-xs text-zinc-500">
                  {formatDuration(song.duration || 0)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ListPlayButton song={song} />
              <button
                onClick={() => handleDelete(song.id)}
                className="text-red-500 hover:text-red-400 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyUploadedSongsPage;
