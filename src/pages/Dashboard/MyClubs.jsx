import Loader from "../../components/shared/Loader";
import useRole from "../../hooks/useRole";
import ManageClubs from "./Admin/ManageClubs";
import ManagerClubs from "./Manager/ManagerClubs";
import MemberClubs from "./Member/MemberClubs";



const MyClubs = () => {

    const { role, roleLoading } = useRole()


    if (roleLoading) {
        return <Loader />
    }
    if (role === 'manager') {
        return <ManagerClubs />

    }
    else {
        return <MemberClubs></MemberClubs>
    }

};

export default MyClubs;
