import { create } from "zustand";
import { Song } from "@/types";
import { useMusicStore } from "./useMusicStore";
import { axiosInstance } from "@/lib/axios";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;

  initializeQueue: (songs: Song[]) => void;
  prependToQueue: (songs: Song[]) => void;
  setCurrentSong: (song: Song | null) => Promise<void>;
  togglePlay: () => void;
  playNext: () => Promise<void>;
  playPrevious: () => Promise<void>;
}

const { fetchRecentsSong, saveRecentPlay } = useMusicStore.getState();

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,

  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
    console.log("queueinition", get().queue);
  },
  
  prependToQueue: (songs: Song[]) => {
    const { queue } = get();
    const newSongs = songs.filter((song) => !queue.some((q) => q.id === song.id));
    const updatedQueue = [...queue, ...newSongs];

    set({
      queue: updatedQueue,
      currentSong: get().currentSong || updatedQueue[0],
      currentIndex: get().currentSong ? updatedQueue.findIndex((s) => s.id === get().currentSong!.id) : 0,
    });
  },

  setCurrentSong: async (song: Song | null) => {
    console.log("song", song);
    if (!song) return;

    try {
      const { data } = await axiosInstance.get(`/stream/${song.id}`);
      const signedUrl = data.signedUrl;
      const signedSong = { ...song, audioUrl: signedUrl };

      const songIndex = get().queue.findIndex((s) => s.id === song.id);
      set({
        currentSong: signedSong,
        isPlaying: true,
        currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
      });
      await saveRecentPlay(song.id);
      await fetchRecentsSong();
    } catch (error) {
      console.error("Failed to set current song:", error);
    }
  },

  togglePlay: () => {
    set({ isPlaying: !get().isPlaying });
  },

  playNext: async () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;
    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      try {
        const { data } = await axiosInstance.get(`/stream/${nextSong.id}`);
        const signedUrl = data.signedUrl;
        const nextWithSigned = { ...nextSong, audioUrl: signedUrl };

        set({
          currentSong: nextWithSigned,
          currentIndex: nextIndex,
          isPlaying: true,
        });

        await saveRecentPlay(nextSong.id);
        await fetchRecentsSong();
      } catch (error) {
        console.error("Failed to play next song:", error);
      }
    } else {
      set({ isPlaying: false });
    }
  },

  playPrevious: async () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      try {
        const { data } = await axiosInstance.get(`/stream/${prevSong.id}`);
        const signedUrl = data.signedUrl;
        const prevWithSigned = { ...prevSong, audioUrl: signedUrl };

        set({
          currentSong: prevWithSigned,
          currentIndex: prevIndex,
          isPlaying: true,
        });

        await saveRecentPlay(prevSong.id);
        await fetchRecentsSong();
      } catch (error) {
        console.error("Failed to play previous song:", error);
      }
    } else {
      set({ isPlaying: false });
    }
  },
}));
