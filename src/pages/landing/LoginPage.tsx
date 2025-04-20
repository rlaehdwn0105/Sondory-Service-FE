import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, isLoggingIn } = useAuthStore();

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		login({ email, password });
	};

	return (
		<div className="h-screen w-full bg-black">
			<header className="max-w-6xl mx-auto flex items-center justify-between p-4">
				<Link to={"/landing"}>
					<div className="w-40 h-16 overflow-hidden">
						<img
							src="/logo.png"
							alt="logo"
							className="w-full h-full object-cover"
						/>
					</div>
				</Link>
			</header>

			<div className="flex justify-center items-center mt-20 mx-3">
				<Card className="w-full max-w-md bg-muted/40 border border-gray-700 text-white">
					<CardHeader>
						<h1 className="text-center text-2xl font-bold">Login</h1>
					</CardHeader>

					<CardContent>
						<form className="space-y-4" onSubmit={handleLogin}>
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-300">
									Email
								</label>
								<input
									type="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
									placeholder="you@example.com"
								/>
							</div>

							<div>
								<label htmlFor="password" className="block text-sm font-medium text-gray-300">
									Password
								</label>
								<input
									type="password"
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
									placeholder="••••••••"
								/>
							</div>

							<Button
								type="submit"
								disabled={isLoggingIn}
								className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
							>
								{isLoggingIn ? "Loading..." : "Login"}
							</Button>
						</form>
					</CardContent>

					<CardFooter className="justify-center text-sm text-gray-400">
						Don't have an account?{" "}
						<Link to="/signup" className="ml-1 text-yellow-400 hover:underline">
							Sign Up
						</Link>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default LoginPage;
