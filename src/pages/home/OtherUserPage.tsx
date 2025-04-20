import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useAuthStore } from "@/stores/useAuthStore";
import ListPlayButton from "./components/ListPlayButton";
import LikeButton from "./components/LikeButton";
import { useParams } from "react-router-dom";

const formatDuration = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
};

const OtherUserPage = () => {
  const { id } = useParams();
  const { userSongs, fetchUserSong, error } = useMusicStore();
  const { initializeQueue } = usePlayerStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (id) {
      fetchUserSong(id);
    }
  }, [fetchUserSong, id]);

  useEffect(() => {
    if (userSongs.length > 0) {
      initializeQueue(userSongs);
    }
  }, [initializeQueue, userSongs]);

  const username = userSongs[0]?.User?.username;

  if (error) return <p className="text-red-500 text-lg">{error}</p>;

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">{username} Songs</h1>

      <ul className="space-y-2">
        {userSongs.map((song) => {
          const likedByMe = !!song.Likers?.some((liker) => liker.id === user?.id);
          const likeCount = song.Likers?.length ?? 0;

          return (
            <li
              key={song.id}
              className="flex items-center justify-between py-3 bg-zinc-800/40 hover:bg-zinc-700/40 transition rounded-md px-2 group"
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
                    {formatDuration(song.duration)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ListPlayButton song={song} />
                <LikeButton
                  songId={song.id}
                  initiallyLiked={likedByMe}
                  initialCount={likeCount}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OtherUserPage;
