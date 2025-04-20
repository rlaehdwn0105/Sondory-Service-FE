import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
	return (
		<div
			className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white relative"
			style={{ backgroundImage: `url('/404.png')` }}
		>
			{/* Header */}
			<header className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-black bg-opacity-60">
				<Link to="/landing">
					<div className="w-40 h-16 overflow-hidden">
						<img
							src="/logo.png"
							alt="Soundory"
							className="w-full h-full object-cover"
						/>
					</div>
				</Link>

				<div className="space-x-3 flex items-center">
					<Link to="/login">
						<Button
							variant="outline"
							className="rounded-full px-6 py-2 text-sm border-white text-white hover:bg-white hover:text-black transition"
						>
							Login
						</Button>
					</Link>
					<Link to="/signup">
						<Button
							className="rounded-full px-6 py-2 text-sm bg-yellow-400 text-black hover:bg-yellow-300 transition"
						>
							Signup
						</Button>
					</Link>
				</div>
			</header>

			{/* Main Content */}
			<main className="text-center z-10 px-4 mt-24 mb-20">
				<h1 className="text-6xl font-bold mb-6 drop-shadow-lg">Welcome to Soundory</h1>
				<p className="text-xl text-gray-200 max-w-xl mx-auto drop-shadow">
					Discover and share music with friends. Stream playlists, upload your own tracks, and find your sound.
				</p>
			</main>

			{/* Footer */}
			<footer className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-gray-400 text-sm text-center py-4 border-t border-gray-700">
				<p>
					<span className="text-yellow-400 font-semibold">Soundory</span> © {new Date().getFullYear()} — Built by{" "}
					<a
						href="https://github.com/kimdongju"
						target="_blank"
						rel="noreferrer"
						className="underline underline-offset-2 hover:text-yellow-300"
					>
						kimdongju
					</a>
				</p>
			</footer>
		</div>
	);
};

export default LandingPage;
