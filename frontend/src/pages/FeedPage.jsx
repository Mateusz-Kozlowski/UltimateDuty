import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users } from "lucide-react";
import { useEffect } from 'react';

const FeedPage = ({ queryType }) => {
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });

    const postsRoute = queryType === "explore" 
        ? (authUser ? "/posts/explore/personalized" : "/posts/explore/public") 
        : "/posts/network";

    const { data: posts, refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await axiosInstance.get(postsRoute);
            return res.data;
        },
    });

    useEffect(() => {
        refetch();
    }, [queryType, refetch]);

    return (
        <div className="flex justify-center px-4">
            <div className="w-full max-w-2xl">
                {authUser && <PostCreation user={authUser} />}

                {posts?.map((post) => (
                    <Post key={post._id} post={post} />
                ))}

                {posts?.length === 0 && (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <div className="mb-6">
                            <Users size={64} className="mx-auto text-blue-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">No Posts Yet</h2>
                        <p className="text-gray-600 mb-6">Connect with others to start seeing posts in your feed!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedPage;
