import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../../../components/shared/SocialLogin';
import useAuth from '../../../hooks/useAuth';


const Login = () => {
    const { signInUser } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(res => {
                console.log(res.user);
                navigate(location.state || '/')

            })
            .catch(err => console.log(err))

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="card bg-white/20 w-full max-w-md mx-4 py-10 shadow-xl rounded-lg p-6">
                <h3 className="text-3xl text-center text-primary font-semibold mb-4">Welcome Back</h3>
                <p className="text-center text-neutral mb-6">Please login to continue</p>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    <fieldset>
                        <label className="label text-secondary">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="input input-bordered w-full rounded-md border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Email"
                        />
                        {errors.email?.type === 'required' && (
                            <p className="text-red-500 text-sm">Email is required</p>
                        )}

                        <label className="label text-secondary mt-4">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            className="input input-bordered w-full rounded-md border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Password"
                        />
                        {errors.password?.type === 'required' && (
                            <p className="text-red-500 text-sm">Password is required</p>
                        )}
                        {errors.password?.type === 'minLength' && (
                            <p className="text-red-500 text-sm">Password must be at least 6 characters</p>
                        )}

                        <div className="text-center mt-4">
                            <a className="link text-primary hover:underline">Forgot password?</a>
                        </div>

                        <button type="submit" className="btn btn-primary w-full py-2 mt-4 rounded-lg hover:bg-primary-focus transition duration-300">
                            Login
                        </button>
                    </fieldset>

                    <p className="text-center text-neutral mt-4">
                        Don't have an account?
                        <Link to="/register" className="text-secondary underline ml-1 hover:text-secondary-focus">
                            Register
                        </Link>
                    </p>
                </form>
                <SocialLogin />
            </div>
        </div>
    );
};

export default Login;
