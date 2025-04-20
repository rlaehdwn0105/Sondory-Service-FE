import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div
			className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white relative"
			style={{ backgroundImage: `url('/404.png')` }}
		>
			{/* 헤더: 로고 */}
			<header className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-black bg-opacity-60">
				<Link to="/">
					<div className="w-40 h-16 overflow-hidden">
						<img
							src="/logo.png"
							alt="Soundory"
							className="w-full h-full object-cover"
						/>
					</div>
				</Link>
			</header>

			{/* 본문 */}
			<main className="text-center z-10 px-4">
				<h1 className="text-7xl font-semibold mb-4">Lost your way?</h1>
				<p className="mb-6 text-xl">
					Sorry, we can't find that page. You'll find lots to explore on the home page.
				</p>
				<Link to="/" className="bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition">
					Home
				</Link>
			</main>
		</div>
	);
};

export default NotFoundPage;
