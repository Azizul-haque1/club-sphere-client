import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAdminStats = () => {
    const axiosSecure = useAxiosSecure()

    return useQuery({
        queryKey: ["adminStats"],
        queryFn: async () => {
            const [
                usersRes,
                clubsRes,
                membershipsRes,
                eventsRes,
                paymentsRes,
            ] = await Promise.all([
                axiosSecure.get("/admin/stats/users"),
                axiosSecure.get("/admin/stats/clubs"),
                axiosSecure.get("/admin/stats/memberships"),
                axiosSecure.get("/admin/stats/events"),
                axiosSecure.get("/admin/stats/payments"),
            ]);

            return {
                users: usersRes.data,
                clubs: clubsRes.data,
                memberships: membershipsRes.data,
                events: eventsRes.data,
                payments: paymentsRes.data,
            };
        },
    });
};

export default useAdminStats;
