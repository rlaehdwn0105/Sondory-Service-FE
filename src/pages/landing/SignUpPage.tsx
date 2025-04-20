import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isSigningUp } = useAuthStore();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup({ email, username, password });
    navigate("/login");
  };

  return (
    <div className="relative h-screen w-full bg-black">
      {isSigningUp && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Loader className="animate-spin text-yellow-500 w-10 h-10" />
        </div>
      )}

      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/landing"}>
          <div className="w-40 h-16 overflow-hidden">
            <img src="logo.png" alt="logo" className="w-full h-full object-cover" />
          </div>
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <Card className="w-full max-w-md bg-muted/40 border border-gray-700 text-white">
          <CardHeader>
            <h1 className="text-center text-2xl font-bold">Sign Up</h1>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSignUp}>
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
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="kimdongju"
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
                disabled={isSigningUp}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                {isSigningUp ? "Loading..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="ml-1 text-yellow-400 hover:underline">
              Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
