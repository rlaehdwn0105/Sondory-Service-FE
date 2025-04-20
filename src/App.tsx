import { Navigate,Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/landing/LoginPage";
import SignUpPage from"./pages/landing/SignUpPage";
import NotFoundPage from "./pages/404/404";
import HomePage from "./pages/home/HomePage";
import { useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore";
import { Loader } from "lucide-react";
import MainLayout from "./layout/MainLayout";
import AllSongsPage from "./pages/home/AllSongPage";
import RecentSongsPage from "./pages/home/RecentSongsPage";
import LikedSongsPage from "./pages/home/likedSongPage";
import ProfilePage from "./pages/home/ProfilePage";
import OtherUserPage from "./pages/home/OtherUserPage";
import VerifyEmailPage from "./pages/landing/VerifyEmailPage";
import UploadPage from "./pages/upload/UploadPage";
import { Toaster } from "react-hot-toast";

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
	useEffect(() => {
		authCheck();
	}, [authCheck]);

	if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-yellow-600 size-10' />
				</div>
			</div>
		);
	}

  return (
    <>

      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/auth/verify" element={<VerifyEmailPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route element={!user ? <Navigate to="/landing" /> : <MainLayout />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/songs" element={<AllSongsPage />} />
          <Route path="/recent" element={<RecentSongsPage />} />
          <Route path="/liked" element={<LikedSongsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user/:id" element={<OtherUserPage />} />
        </Route>
      </Routes>

      <Toaster/>
    </>
  );
}


export default App;
