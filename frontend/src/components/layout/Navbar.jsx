import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import { Bell, Home, Compass, LogOut, User, Users } from "lucide-react";

const Navbar = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();

	const { data: notifications } = useQuery({
		queryKey: ["notifications"],
		queryFn: async () => axiosInstance.get("/notifications"),
		enabled: !!authUser,
	});

	const { data: connectionRequests } = useQuery({
		queryKey: ["connectionRequests"],
		queryFn: async () => axiosInstance.get("/connections/requests"),
		enabled: !!authUser,
	});

	const { mutate: logout } = useMutation({
		mutationFn: () => axiosInstance.post("/auth/logout"),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});

	const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
	const unreadConnectionRequestsCount = connectionRequests?.data?.length;

	return (
		<nav className='bg-secondary shadow-md sticky top-0 z-10'>
	<div className='max-w-screen-xl mx-auto px-4'>
		<div className='flex justify-center items-center py-3 gap-10'>
			{authUser ? (
				<>
					<Link to={"/"} className='text-neutral flex flex-col items-center'>
						<Home size={20} />
						<span className='text-xs hidden md:block'>Home</span>
					</Link>

					<Link to={"/explore"} className='text-neutral flex flex-col items-center'>
						<Compass size={20} />
						<span className='text-xs hidden md:block'>Explore</span>
					</Link>
					
					<Link to='/network' className='text-neutral flex flex-col items-center relative'>
						<Users size={20} />
						<span className='text-xs hidden md:block'>Network</span>
						{unreadConnectionRequestsCount > 0 && (
							<span className='absolute -top-1 -right-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1'>
								{unreadConnectionRequestsCount}
							</span>
						)}
					</Link>

					<Link to='/notifications' className='text-neutral flex flex-col items-center relative'>
						<Bell size={20} />
						<span className='text-xs hidden md:block'>Notifications</span>
						{unreadNotificationCount > 0 && (
							<span className='absolute -top-1 -right-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1'>
								{unreadNotificationCount}
							</span>
						)}
					</Link>

					<Link to={`/profile/${authUser.username}`} className='text-neutral flex flex-col items-center'>
						<User size={20} />
						<span className='text-xs hidden md:block'>Me</span>
					</Link>

					<button className='flex items-center space-x-1 text-sm text-neutral hover:text-gray-800' onClick={() => logout()}>
						<LogOut size={20} />
						<span className='hidden md:inline'>Logout</span>
					</button>
				</>
			) : (
				<>
					<Link to='/login' className='btn btn-ghost'>
						Sign In
					</Link>
					<Link to='/signup' className='btn btn-primary'>
						Join now
					</Link>
				</>
			)}
		</div>
	</div>
</nav>
	);

};
export default Navbar;
