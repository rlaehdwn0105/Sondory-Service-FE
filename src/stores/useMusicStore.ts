import { axiosInstance } from "@/lib/axios";
import { Song } from "@/types";
import { create } from "zustand";
import toast from "react-hot-toast";

interface MusicStore {
	isLoading: boolean;
	error: string | null;
	AllSongs: Song[];
	myLikedSongs: Song[];
	mySongs: Song[];
	userSongs: Song[];
	userRecentSongs: Song[];
	
	fetchAllSongs: () => Promise<void>;
	fetchmyLikedSongs: () => Promise<void>;
	fetchmySongs: () => Promise<void>;
	fetchUserSong: (id: string) => Promise<void>;
	fetchRecentsSong: () => Promise<void>;
	saveRecentPlay: (id: string) => Promise<void>;
	likeSong: (songId: string) => Promise<boolean>;
	unlikeSong: (songId: string) => Promise<boolean>;
	deleteSong: (songId: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
	isLoading: false,
	error: null,
    AllSongs: [],
	myLikedSongs: [],
	mySongs: [],
	userSongs: [],
	userRecentSongs: [],

	fetchAllSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/song");
			console.log("response", response.data);
			set({ AllSongs: response.data });
		} catch (error: any) {
			set({ error: error.response?.data?.message });
		} finally {
			set({ isLoading: false });
		}
	},
	fetchmyLikedSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/like");
			set({ myLikedSongs: response.data });
		} catch (error: any) {
			set({ error: error.response?.data?.message });
		} finally {
			set({ isLoading: false });
		}
	},
	fetchmySongs : async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/user");
			set({ mySongs: response.data });
		} catch (error: any) {
			set({ error: error.response?.data?.message });
		} finally {
			set({ isLoading: false });
		}
	},
	fetchUserSong: async (id: string) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/song/${id}`);
			set({ userSongs: response.data });
		} catch (error: any) {
			set({ error: error.response?.data?.message });
		} finally {
			set({ isLoading: false });
		}
	},
	fetchRecentsSong: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/song/recent");
			set({ userRecentSongs: response.data });
		} catch (error: any) {
			set({ error: error.response?.data?.message });
		} finally {
			set({ isLoading: false });
		}
	},
	saveRecentPlay: async (id: string) => {
		set({ isLoading: true, error: null });
		try {
		await axiosInstance.post(`/song/recent/${id}`);
		} catch (error: any) {
		set({ error: error.response?.data?.message });
		} finally {
		set({ isLoading: false });
		}
	},
	likeSong: async (songId: string) => {
		set({ isLoading: true, error: null });
		try {
		  const response = await axiosInstance.post(`/like/${songId}`);
		  toast.success("Added to Likes");
		  return response.data.liked; 
		} catch (error: any) {
		  set({ error: error.response?.data?.message });
		  return false;
		} finally {
		  set({ isLoading: false });
		}
	  },
	unlikeSong: async (songId: string) => {
		set({ isLoading: true, error: null });
		try {
		  const response = await axiosInstance.delete(`/like/${songId}`);
		  toast.success("Removed from Likes"); 
		  return response.data.liked; 
		} catch (error: any) {
		  set({ error: error.response?.data?.message });
		  return true;
		} finally {
		  set({ isLoading: false });
		}
	  },
	  deleteSong: async (songId: string) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/user/deletesong/${songId}`);
			toast.success("Song deleted successfully");
		} catch (error: any) {
			set({ error: error.response?.data?.message });
		} finally {
			set({ isLoading: false });
		}
	},
}));