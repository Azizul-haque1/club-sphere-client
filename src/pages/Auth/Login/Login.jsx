import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../../../components/shared/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Login = () => {
    const { signInUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        try {
            await signInUser(data.email, data.password);
            toast.success('Welcome back!');
            navigate(location.state || '/');
        } catch (error) {
            console.error(error);
            toast.error('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex bg-base-100">
            {/* <Helmet> */}
                <title>Login | Club Sphere</title>
            {/* </Helmet> */}

            {/* Left Side - Decorative Image/Content */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary/80 mix-blend-multiply z-10" />
                <img
                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Community Gathering"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 flex flex-col justify-center h-full max-w-lg mx-auto px-12 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-5xl font-bold mb-6 !leading-tight">
                            Welcome Back to Club Sphere
                        </h1>
                        <p className="text-lg opacity-90 mb-8 font-light">
                            Connect, collaborate, and grow with your community. Join upcoming events and manage your club activities seamlessly.
                        </p>
                        <div className="flex gap-4">
                            <div className="badge badge-outline badge-lg p-4 font-normal text-white">Exclusive Events</div>
                            <div className="badge badge-outline badge-lg p-4 font-normal text-white">Community Driven</div>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl z-20"></div>
                <div className="absolute top-24 right-12 w-32 h-32 bg-white/20 rounded-full blur-2xl z-20"></div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
                {/* Mobile Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 lg:hidden -z-10" />

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[400px]"
                >
                    <div className="mb-8 text-center lg:text-left">
                        <Link to="/" className="inline-block mb-8 lg:hidden font-bold text-2xl text-primary">
                            ClubSphere
                        </Link>
                        <h2 className="text-3xl font-bold mb-2">Sign in to Account</h2>
                        <p className="text-base-content/60">Enter your email and password to continue</p>
                    </div>

                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
                        <div className="form-control">
                            <label className="label font-medium">Email Address</label>
                            <div className="relative">
                                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                                <input
                                    type="email"
                                    {...register('email', { required: true })}
                                    className={`input input-bordered w-full pl-12 py-6 rounded-2xl focus:input-primary transition-all ${errors.email ? 'input-error' : ''}`}
                                    placeholder="name@example.com"
                                />
                            </div>
                            {errors.email && (
                                <span className="text-error text-xs mt-2 ml-1">Email address is required</span>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label font-medium">Password</label>
                            <div className="relative">
                                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                                <input
                                    type="password"
                                    {...register('password', { required: true, minLength: 6 })}
                                    className={`input input-bordered w-full pl-12 py-6 rounded-2xl focus:input-primary transition-all ${errors.password ? 'input-error' : ''}`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password?.type === 'required' && (
                                <span className="text-error text-xs mt-2 ml-1">Password is required</span>
                            )}
                            {errors.password?.type === 'minLength' && (
                                <span className="text-error text-xs mt-2 ml-1">Password must be at least 6 characters</span>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm rounded" />
                                <span className="text-base-content/70">Remember me</span>
                            </label>
                            <a href="#" className="link link-primary no-underline hover:underline font-medium">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full rounded-xl py-3 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                        >
                            <span>Sign In</span>
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="my-8 flex items-center gap-4">
                        <div className="h-px bg-base-200 flex-1" />
                        <span className="text-xs text-base-content/50 font-medium uppercase tracking-wider">Or continue with</span>
                        <div className="h-px bg-base-200 flex-1" />
                    </div>

                    <SocialLogin />

                    <p className="text-center mt-8 text-base-content/70">
                        Don't have an account yet?{' '}
                        <Link
                            to="/register"
                            className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
                        >
                            Create an account
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
