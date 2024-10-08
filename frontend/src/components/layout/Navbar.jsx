import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from '../../lib/axios';

const Navbar = () => {
    const {data:authUser} = useQuery({queryKey: ["authUser"], })
    
    const {data:notifications} = useQuery(
        {
            queryKey: ["notifications"],
            queryFn: async() => axiosInstance.get("/notifications"),
            enabled: !!authUser
        }
    )

    const {data:connectionRequests} = useQuery(
        {
            queryKey: ["notificationRequests"],
            queryFn: async() => axiosInstance.get("/connections/requests"),
            enabled: !!authUser
        }
    )

    console.log("notifications", notifications);
    console.log("connectionRequests", connectionRequests);

    return <div>Navbar</div>;
}
export default Navbar;
