import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { update_User_data } from "../../reduxSlices/userInfo"
import { BsEmojiTear } from "react-icons/bs";


const SigninForm = () => {


    const dispatch = useDispatch();


    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const [isLoginState, setIsLoginState] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => password.length >= 6;

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setError(''); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email
        if (!formData.email) {
            setError('**Email is required.**');
            return;
        } else if (!validateEmail(formData.email)) {
            setError('**Please enter a valid email address.**');
            return;
        }

        // Validate password
        if (!formData.password) {
            setError('**Password is required.**');
            return;
        } else if (!validatePassword(formData.password)) {
            setError('**Password must be at least 6 characters.**');
            return;
        }

        // Validate confirm password
        if (formData.confirmPassword !== formData.password) {
            setError('**Passwords do not match.**');
            return;
        }

        try {
            setIsLoginState(true);
            const response = await axios.post('http://localhost:500/signin', formData);

            console.log('Server Response:', response.data);
            setFormData({ email: '', password: '', confirmPassword: '' });
            setError('');
            setIsLoginState(false);
            dispatch(update_User_data(response.data.response_data))

            if (response.status === 200) {
                setFormData({ email: '', password: '', confirmPassword: '' });
                setError('');
                setIsLoginState(false);
                // Set a cookie
                Cookies.set('user', response.data.token, { expires: 1, path: '' });
                navigate("/")
            } else if (response.status === 201) {
                setError('');;
                setIsLoginState(false);
            }
        } catch (error) {
            setError(`**${error.response?.data || error.message}**`);
            setIsLoginState(false);
        }
    };

    return (
        <>




            <div className=" hidden lg:flex flex-col justify-center gap-[20vh] lg:gap-[15vh] items-center min-h-screen bg-[#000101]">
                <form
                    onSubmit={handleSubmit}
                    className="lg:bg-[#121212] text-white shadow-md font-body_font rounded px-8 py-6 w-full max-w-md"
                >
                    <div className="text-2xl no-scrollbar font-bold flex flex-row font-heading text-[#08618e] text-center mb-6">
                        <Link to="/signup" className="w-1/2 text-center flex justify-center cursor-pointer">
                            <h2 className="w-1/2 text-center cursor-pointer">Join Us</h2>
                        </Link>

                        <Link to="/signin" className="w-1/2 text-center flex justify-center cursor-pointer">
                            <h2 className="w-1/2 text-center cursor-pointer">Sign In</h2>
                        </Link>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 text-red-500 text-sm font-heading text-center">
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-1 border border-gray-700 bg-inherit rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#08618e]"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 font-heading">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-3 py-1 border border-gray-700 bg-inherit rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#08618e]"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-gray-700 text-sm font-bold mb-2 font-heading"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-3 py-1 border border-gray-700 bg-inherit rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#08618e]"
                            placeholder="Confirm your password"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full bg-[#08618e] text-[5vw] lg:text-[1.5vw] font-postnobills text-white py-1 px-2 rounded-md ${isLoginState ? 'cursor-not-allowed bg-gray-400' : ''
                            }`}
                        disabled={isLoginState}
                    >
                        {isLoginState ? 'Please wait...' : 'Sign In'}
                    </button>
                </form>
            </div>


            <div className='bg-[#101010] flex flex-col gap-[5vh] justify-center w-screen h-screen  items-center lg:hidden'>

                <BsEmojiTear className='text-[15vw] text-white/70' />
                <h1 className='text-center w-[70%] text-white/70 text-[4vw]'>We are really sorry, currently, we are available for computers only</h1>

            </div>

        </>
    );
};

export default SigninForm;
