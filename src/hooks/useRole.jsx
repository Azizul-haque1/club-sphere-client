import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';



const useRole = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { isLoading: roleLoading, data: role = 'user' } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`)
            return res.data.role || 'user'
        }
    })

    return { role, roleLoading }
};


export default useRole;