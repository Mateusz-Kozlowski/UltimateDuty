import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { ExternalLink, Eye, MessageSquare, ThumbsUp, Trash2, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();

	const { data: notifications, isLoading } = useQuery({
		queryKey: ["notifications"],
		queryFn: () => axiosInstance.get("/notifications"),
	});

	const { mutate: markAsReadMutation } = useMutation({
		mutationFn: (id) => axiosInstance.put(`/notifications/${id}/read`),
		onSuccess: () => {
			queryClient.invalidateQueries(["notifications"]);
		},
	});

	const { mutate: deleteNotificationMutation } = useMutation({
		mutationFn: (id) => axiosInstance.delete(`/notifications/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries(["notifications"]);
			toast.success("Notification deleted");
		},
	});

	const renderNotificationIcon = (type) => {
		switch (type) {
			case "like":
				return <ThumbsUp className="text-primary" />;
			case "comment":
				return <MessageSquare className="text-green-500" />;
			case "connectionAccepted":
				return <UserPlus className="text-purple-500" />;
			default:
				return null;
		}
	};

	const renderNotificationContent = (notification) => {
		switch (notification.type) {
			case "like":
				return (
					<span>
						<strong className="text-neutral-content">{notification.relatedUser.name}</strong> liked your post
					</span>
				);
			case "comment":
				return (
					<span>
						<Link to={`/profile/${notification.relatedUser.username}`} className="font-bold text-primary">
							{notification.relatedUser.name}
						</Link>{" "}
						commented on your post
					</span>
				);
			case "connectionAccepted":
				return (
					<span>
						<Link to={`/profile/${notification.relatedUser.username}`} className="font-bold text-primary">
							{notification.relatedUser.name}
						</Link>{" "}
						accepted your connection request
					</span>
				);
			default:
				return null;
		}
	};

	const renderRelatedPost = (relatedPost) => {
		if (!relatedPost) return null;

		return (
			<Link
				to={`/post/${relatedPost._id}`}
				className="mt-2 p-2 bg-neutral rounded-md flex items-center space-x-2 hover:bg-base-200 transition-colors"
			>
				{relatedPost.image && (
					<img src={relatedPost.image} alt="Post preview" className="w-10 h-10 object-cover rounded" />
				)}
				<div className="flex-1 overflow-hidden">
					<p className="text-sm text-neutral-content truncate">{relatedPost.content}</p>
				</div>
				<ExternalLink size={14} className="text-neutral-content" />
			</Link>
		);
	};

	return (
		<div className="flex justify-center">
			<div className="w-full max-w-2xl bg-secondary text-neutral-content rounded-lg shadow p-6">
				<h1 className="text-2xl text-white font-bold mb-6">Notifications</h1>

				{isLoading ? (
					<p>Loading notifications...</p>
				) : notifications && notifications.data.length > 0 ? (
					<ul>
						{notifications.data.map((notification) => (
							<li
								key={notification._id}
								className={`bg-base-100 rounded-lg p-4 my-4 transition-all hover:shadow-md ${
									!notification.read ? "border-primary" : "border-neutral"
								}`}
							>
								<div className="flex items-start justify-between">
									<div className="flex items-center space-x-4">
										<Link to={`/profile/${notification.relatedUser.username}`}>
											<img
												src={notification.relatedUser.profilePicture || "/avatar.png"}
												alt={notification.relatedUser.name}
												className="w-12 h-12 rounded-full object-cover"
											/>
										</Link>

										<div>
											<div className="flex items-center gap-2">
												<div className="p-1 bg-base-200 rounded-full">
													{renderNotificationIcon(notification.type)}
												</div>
												<p className="text-sm text-info">
													{renderNotificationContent(notification)}
												</p>
											</div>
											<p className="text-xs text-info mt-1">
												{formatDistanceToNow(new Date(notification.createdAt), {
													addSuffix: true,
												})}
											</p>
											{renderRelatedPost(notification.relatedPost)}
										</div>
									</div>

									<div className="flex gap-2">
										{!notification.read && (
											<button
												onClick={() => markAsReadMutation(notification._id)}
												className="p-1 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
												aria-label="Mark as read"
											>
												<Eye size={16} />
											</button>
										)}

										<button
											onClick={() => deleteNotificationMutation(notification._id)}
											className="p-1 bg-transparent text-error hover:text-red-700 rounded hover:bg-error-dark transition-colors"
											aria-label="Delete notification"
										>
											<Trash2 size={16} />
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className="text-neutral-content">No notifications at the moment.</p>
				)}
			</div>
		</div>
	);
};

export default NotificationsPage;
