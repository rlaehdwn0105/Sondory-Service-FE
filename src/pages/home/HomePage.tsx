import AllSongs from "./components/Allsong";
import RecentSong from "./components/RecentSong";
import { useEffect } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useMusicStore } from "@/stores/useMusicStore";

const HomePage = () => {
  const { userRecentSongs } = useMusicStore();
  const { prependToQueue } = usePlayerStore();

  useEffect(() => {
    const allSongs = [...userRecentSongs];
    console.log("allSongs:", allSongs);
    if (allSongs.length > 0) {
      prependToQueue(allSongs);
    }
  }, [prependToQueue, userRecentSongs]);

  return (
    <main className="p-4 sm:p-6 space-y-6">
      <AllSongs />
      <RecentSong /> 
    </main>
  );
};

export default HomePage;
