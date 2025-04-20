import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button"; // 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

const Topbar = () => {
  const { user, logout } = useAuthStore();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="flex items-center justify-between px-4 h-12 bg-black">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-14 h-9 object-contain" />
        </Link>
        <nav className="flex gap-4 text-sm text-gray-300">
          <Link to="/" className="hover:text-white font-semibold border-b-2 border-white pb-0.5">
            Home
          </Link>
        </nav>
      </div>

      <div className="relative w-full max-w-md">
        <Input
          type="text"
          placeholder="Search"
          className="bg-zinc-900 text-white text-sm rounded px-3 pl-9 py-1.5 border border-zinc-700"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
      </div>

      <div className="flex items-center gap-4 ml-4">
        <Link to="/upload">
          <Button className="rounded-full bg-yellow-400 text-black hover:bg-yellow-300 font-semibold px-4 py-1.5 text-sm">
            Upload
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="w-8 h-8 rounded-full bg-gray-600 text-sm font-semibold text-white flex items-center justify-center cursor-pointer">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black text-white border border-gray-700">
            <DropdownMenuItem disabled>
              <span className="ml-1 font-bold">{user?.username}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/profile">My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/edit-profile">Edit Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-400 hover:bg-gray-800 cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;
