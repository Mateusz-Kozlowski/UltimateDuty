import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import FeedPage from "./pages/FeedPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import NotificationsPage from "./pages/NotificationsPage";
import NetworkPage from "./pages/NetworkPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import LifeDashboardPage from "./pages/LifeDashboardPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import toast, { Toaster } from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";

function App() {
  console.log('xd');
  
  const { data: authUser, isLoading } = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await axiosInstance.get("/auth/me");
				return res.data;
			} catch (err) {
				if (err.response && err.response.status === 401) {
					return null;
				}
				toast.error(err.response.data.message || "Something went wrong");
			}
		},
	});

  if (isLoading) {
    return null;
  }

  return (<Layout>
    <Routes>
      <Route path='/' element={ authUser ? <FeedPage queryType="network"/> : <Navigate to={'/login'} /> } />
      <Route path='/explore' element={ authUser ? <FeedPage queryType="explore" /> : <Navigate to={'/login'} /> } />
      <Route path='/signup' element={ !authUser ? <SignUpPage /> : <Navigate to={"/"} /> } />
      <Route path='/login' element={ !authUser ? <LoginPage /> : <Navigate to={"/"} /> } />
      <Route path='/learn/:category' element={ authUser ? <FlashcardsPage /> : <Navigate to={"/"} /> } />
      <Route path='/life-dashboard' element={ authUser ? <LifeDashboardPage /> : <Navigate to={"/"} /> } />
      <Route path='/notifications' element={ authUser ? <NotificationsPage /> : <Navigate to={"/"} /> } />
      <Route path='/network' element={authUser ? <NetworkPage /> : <Navigate to={"/login"} />} />
      <Route path='/post/:postId' element={authUser ? <PostPage /> : <Navigate to={"/login"} />} />
      <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
    </Routes>
    <Toaster />
  </Layout>);
}

export default App;
