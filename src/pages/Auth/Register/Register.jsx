import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Loader from "../../../components/shared/Loader";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile, loading, setLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();

    const handleRegistration = async (data) => {
        try {
            setLoading(true);
            const profileImg = data.photo[0];
            await registerUser(data.email, data.password);
            const formData = new FormData();
            formData.append("image", profileImg);

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
            const imageRes = await axios.post(image_API_URL, formData);
            const photoURL = imageRes.data.data.url;

            const userInfo = {
                email: data.email.toLowerCase(),
                displayName: data.name,
                photoURL,
            };
            await updateUserProfile({
                displayName: data.name,
                photoURL,
            });
            const res = await axiosSecure.post("/users", userInfo);

            console.log(res.data);

            if (res.data.insertedId) {
                console.log("User created in database");
                navigate(location.state ? location.state : "/");
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="card bg-white/20 w-full mx-auto max-w-md shadow-2xl p-6">
                <h3 className="text-3xl text-center text-primary font-semibold mb-4">
                    Welcome to Club Sphere
                </h3>
                <p className="text-center text-neutral mb-6">Please Register</p>

                {/* {loading && <Loader />} */}

                <form className="space-y-4" onSubmit={handleSubmit(handleRegistration)}>
                    <fieldset>
                        {/* Name */}
                        <label className="label text-secondary">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="input input-bordered w-full mb-2"
                            placeholder="Your Name"
                        />
                        {errors.name && <p className="text-red-500">Name is required.</p>}

                        {/* Photo */}
                        <label className="label text-secondary">Photo</label>
                        <input
                            type="file"
                            {...register("photo", { required: true })}
                            className="file-input input-bordered w-full mb-2"
                        />
                        {errors.photo && <p className="text-red-500">Photo is required.</p>}

                        {/* Email */}
                        <label className="label text-secondary">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="input input-bordered w-full mb-2"
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500">Email is required.</p>}

                        {/* Password */}
                        <label className="label text-secondary">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                            })}
                            className="input input-bordered w-full mb-2"
                            placeholder="Password"
                        />

                        {errors.password?.type === "required" && (
                            <p className="text-red-500">Password is required.</p>
                        )}

                        {errors.password?.type === "minLength" && (
                            <p className="text-red-500">Password must be 6 characters or longer</p>
                        )}

                        {errors.password?.type === "pattern" && (
                            <p className="text-red-500">
                                Password must have uppercase, lowercase, number & special character
                            </p>
                        )}

                        <button
                            disabled={loading}
                            className="btn btn-primary w-full mt-4"
                        >
                            Register
                        </button>
                    </fieldset>

                    <p className="text-center text-neutral mt-4">
                        Already have an account?
                        <Link
                            to="/login"
                            state={location.state}
                            className="text-secondary underline ml-1"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
