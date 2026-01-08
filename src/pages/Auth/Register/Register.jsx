import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from 'framer-motion';
import { User, Mail, Lock, Image as ImageIcon, ArrowRight, Loader } from 'lucide-react';
import { Helmet } from "react-helmet";

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
                toast.success('Registered successfully');
                navigate(location.state ? location.state : "/");
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-base-100">
            <Helmet>
                <title>Register | Club Sphere</title>
            </Helmet>

            {/* Left Side - Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
                {/* Mobile Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 lg:hidden -z-10" />

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[450px]"
                >
                    <div className="mb-8 text-center lg:text-left">
                        <Link to="/" className="inline-block mb-8 lg:hidden font-bold text-2xl text-primary">
                            ClubSphere
                        </Link>
                        <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                        <p className="text-base-content/60">Join our community and start your journey</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(handleRegistration)}>

                        {/* Name Field */}
                        <div className="form-control">
                            <label className="label font-medium">Full Name</label>
                            <div className="relative">
                                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    className={`input input-bordered w-full pl-12 py-6 rounded-2xl focus:input-primary transition-all ${errors.name ? 'input-error' : ''}`}
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && <span className="text-error text-xs mt-2 ml-1">Name is required</span>}
                        </div>

                        {/* Photo Upload */}
                        <div className="form-control">
                            <label className="label font-medium">Profile Photo</label>
                            <div className="relative">
                                <ImageIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 z-10" />
                                <input
                                    type="file"
                                    {...register("photo", { required: true })}
                                    className={`file-input file-input-bordered w-full pl-12 rounded-2xl focus:file-input-primary transition-all ${errors.photo ? 'file-input-error' : ''}`}
                                />
                            </div>
                            {errors.photo && <span className="text-error text-xs mt-2 ml-1">Photo is required</span>}
                        </div>

                        {/* Email Field */}
                        <div className="form-control">
                            <label className="label font-medium">Email Address</label>
                            <div className="relative">
                                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    className={`input input-bordered w-full pl-12 py-6 rounded-2xl focus:input-primary transition-all ${errors.email ? 'input-error' : ''}`}
                                    placeholder="name@example.com"
                                />
                            </div>
                            {errors.email && <span className="text-error text-xs mt-2 ml-1">Email is required</span>}
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label font-medium">Password</label>
                            <div className="relative">
                                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                                    })}
                                    className={`input input-bordered w-full pl-12 py-6 rounded-2xl focus:input-primary transition-all ${errors.password ? 'input-error' : ''}`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password?.type === "required" && <span className="text-error text-xs mt-2 ml-1">Password is required</span>}
                            {errors.password?.type === "minLength" && <span className="text-error text-xs mt-2 ml-1">Must be 6 characters or longer</span>}
                            {errors.password?.type === "pattern" && <span className="text-error text-xs mt-2 ml-1">Must contain Uppercase, Lowercase, Number & Special char</span>}
                        </div>

                        <button
                            disabled={loading}
                            className="btn btn-primary w-full rounded-xl py-3 mt-4 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                        >
                            {loading ? (
                                <>
                                    <Loader className="animate-spin" size={20} />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <span>Register</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-base-content/70">
                        Already have an account?
                        <Link
                            to="/login"
                            state={location.state}
                            className="text-primary font-semibold hover:underline inline-flex items-center gap-1 ml-1"
                        >
                            Login
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Right Side - Decorative Image */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-secondary">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/80 to-primary/80 mix-blend-multiply z-10" />
                <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Men Collaborating"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 flex flex-col justify-center h-full max-w-lg mx-auto px-12 text-white text-right">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-5xl font-bold mb-6 !leading-tight">
                            Start Your Journey Today
                        </h1>
                        <p className="text-lg opacity-90 mb-8 font-light">
                            Unlock exclusive access to events, connect with like-minded individuals, and be part of something bigger.
                        </p>
                        <div className="flex justify-end gap-4">
                            <div className="badge badge-outline badge-lg p-4 font-normal text-white">Networking</div>
                            <div className="badge badge-outline badge-lg p-4 font-normal text-white">Growth</div>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-24 -left-12 w-48 h-48 bg-white/10 rounded-full blur-3xl z-20"></div>
                <div className="absolute bottom-24 right-12 w-32 h-32 bg-white/20 rounded-full blur-2xl z-20"></div>
            </div>
        </div>
    );
};

export default Register;
