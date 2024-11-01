import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const queryClient = useQueryClient();

	const { mutate: loginMutation, isLoading } = useMutation({
		mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: (err) => {
			toast.error(err.response.data.message || "Something went wrong");
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		loginMutation({ username, password });
	};

	return (
		<form onSubmit={handleSubmit} className="bg-secondary space-y-4 w-full max-w-md">
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className="w-full p-3 bg-base-100 text-white placeholder-gray-400 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="w-full p-3 bg-base-100 text-white placeholder-gray-400 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
				required
			/>
			<button type="submit" className="bg-primary text-white w-full py-2 rounded-md hover:bg-primary-dark transition">
				{isLoading ? <Loader className="animate-spin" /> : "Login"}
			</button>
		</form>
	);
};

export default LoginForm;
