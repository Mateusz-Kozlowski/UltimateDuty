import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import NotificationsPage from "./pages/NotificationsPage";
import NetworkPage from "./pages/NetworkPage";
import toast, { Toaster } from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import { Network } from "lucide-react";

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

  console.log('is loading=', isLoading);

  if (isLoading) {
    return null;
  }
  
  console.log("authUser=", authUser);
  
  return (<Layout>
    <Routes>
      <Route path='/' element={ authUser ? <HomePage/> : <Navigate to={'/login'} /> } />
      <Route path='/signup' element={ !authUser ? <SignUpPage /> : <Navigate to={"/"} /> } />
      <Route path='/login' element={ !authUser ? <LoginPage /> : <Navigate to={"/"} /> } />
      <Route path='/notifications' element={ authUser ? <NotificationsPage /> : <Navigate to={"/"} /> } />
      <Route path='/network' element={authUser ? <NetworkPage /> : <Navigate to={"/login"} />} />
    </Routes>
    <Toaster />
  </Layout>);
}

export default App;
