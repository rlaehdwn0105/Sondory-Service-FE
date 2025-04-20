import { Outlet } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import RightSidebar from "./components/RightSidebar";
import AudioPlayer from "./components/AudioPlayer";
import { PlaybackControls } from "./components/PlaybackControls";

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-white">
      <AudioPlayer />
      <header className="w-full bg-zinc-950">
        <TopNavBar />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 bg-zinc-950 overflow-hidden relative">
          <div className="scroll-container overflow-y-auto hover:overflow-y-scroll h-full px-6 py-4">
            <Outlet />
          </div>
        </main>
        <aside className="w-[380px] min-w-[340px] max-w-[420px] bg-zinc-900 px-4 py-6">
          <RightSidebar />
        </aside>
      </div>
      
      <footer className="w-full bg-zinc-950">
        <PlaybackControls />
      </footer>
    </div>
  );
};

export default MainLayout;
