import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';



const useRole = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    // console.log('user', user);
    const { isLoading: roleLoading, data: role = 'member' } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`)
            // console.log(res.data.role);
            return res.data.role || 'member'
        },
        enabled: !!user,
    })

    return { role, roleLoading }
};


export default useRole;