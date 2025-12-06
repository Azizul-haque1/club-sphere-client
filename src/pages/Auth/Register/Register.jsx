import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const handleRegistration = (data) => {
        const profileImg = data.photo[0];
        registerUser(data.email, data.password)
            .then(() => {
                const formData = new FormData();
                formData.append('image', profileImg);

                // 2. send the photo to store and get the ul
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;


                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user created in the database');
                                }
                                navigate(location.state || '/')
                            })

                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        updateUserProfile(userProfile)
                            .then(() => {

                                navigate(location.state ? location.state : '/');
                            })
                            .catch(error => console.log(error))
                    })



            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="card bg-white/20 w-full mx-auto max-w-md shrink-0 shadow-2xl p-6">
                <h3 className="text-3xl text-center text-primary font-semibold mb-4">Welcome to Club Sphere</h3>
                <p className='text-center text-neutral  mb-6'>Please Register</p>
                <form className="space-y-4" onSubmit={handleSubmit(handleRegistration)}>
                    <fieldset className="">
                        {/* name field */}
                        <label className="label text-secondary">Name</label>
                        <input type="text"
                            {...register('name', { required: true })}
                            className="input input-bordered w-full rounded-md border-primary focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                            placeholder="Your Name" />
                        {errors.name?.type === 'required' && <p className='text-red-500'>Name is required.</p>}

                        {/* photo image field */}
                        <label className="label text-secondary text-secondary">Photo</label>

                        <input type="file" {...register('photo', { required: true })} className="file-input input input-bordered w-full rounded-md text-primary  file:text-primary mb-4" placeholder="Your Photo" />

                        {errors.name?.type === 'required' && <p className='text-red-500'>Photo is required.</p>}

                        {/* email field */}
                        <label className="label text-secondary">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input input-bordered w-full rounded-md border-primary focus:outline-none focus:ring-2 focus:ring-primary mb-4" placeholder="Email" />
                        {errors.email?.type === 'required' && <p className='text-red-500'>Email is required.</p>}

                        {/* password */}
                        <label className="label text-secondary">Password</label>
                        <input type="password" {...register('password', {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                        })} className="input input-bordered w-full rounded-md border-primary focus:outline-none focus:ring-2 focus:ring-primary mb-4" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>
                                Password must be 6 characters or longer
                            </p>
                        }
                        {
                            errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have at least one uppercase, at least one lowercase, at least one number, and at least one special characters</p>
                        }


                        <button className="btn btn-primary w-full py-2 mt-4 rounded-lg hover:bg-primary-focus transition duration-300">Register</button>
                    </fieldset>
                    <p className="text-center text-neutral mt-4">Already have an account <Link
                        state={location.state}
                        className='text-secondary underline ml-1 hover:text-secondary-focus'
                        to="/login">Login</Link></p>
                </form>

            </div>
        </div>
    );
};

export default Register;