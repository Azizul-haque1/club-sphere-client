import Swal from "sweetalert2";

const useAlert = () => {
    const showAlert = ({ title, icon = "success", timer = 1500 }) => {
        Swal.fire({
            position: "top-center",
            icon,
            title,
            showConfirmButton: false,
            timer
        });
    };

    return showAlert;
};

export default useAlert;
