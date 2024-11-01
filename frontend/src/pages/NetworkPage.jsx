import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { UserPlus } from "lucide-react";
import FriendRequest from "../components/FriendRequest";
import UserCard from "../components/UserCard";

const NetworkPage = () => {
	const { data: user } = useQuery({ queryKey: ["authUser"] });

	const { data: connectionRequests } = useQuery({
		queryKey: ["connectionRequests"],
		queryFn: () => axiosInstance.get("/connections/requests"),
	});

	const { data: connections } = useQuery({
		queryKey: ["connections"],
		queryFn: () => axiosInstance.get("/connections"),
	});

	return (
		<div className="flex justify-center">
			<div className="w-full max-w-2xl bg-secondary text-neutral-content rounded-lg shadow p-6">
				<h1 className="text-2xl text-white font-bold mb-6">My Network</h1>

				{connectionRequests?.data?.length > 0 ? (
					<div className="mb-8">
						<h2 className="text-xl font-semibold mb-2">Connection Requests</h2>
						<div className="space-y-4">
							{connectionRequests.data.map((request) => (
								<FriendRequest key={request.id} request={request} />
							))}
						</div>
					</div>
				) : (
					<div className="bg-secondary rounded-lg shadow p-6 text-center mb-6">
						<UserPlus size={48} className="mx-auto mb-4 text-info" />
						<h3 className="text-xl font-semibold mb-2 text-info">No Connection Requests</h3>
						<p className="text-info">
							You don&apos;t have any pending connection requests at the moment.
						</p>
						<p className="text-info mt-2">
							Explore suggested connections below to expand your network!
						</p>
					</div>
				)}
				
				{connections?.data?.length > 0 && (
					<div className="mb-8">
						<h2 className="text-xl font-semibold mb-4 text-info">My Connections</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{connections.data.map((connection) => (
								<UserCard key={connection._id} user={connection} isConnection={true}/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default NetworkPage;
