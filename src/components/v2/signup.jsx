import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../../App.css"
const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    callingName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    callingName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoginState, setIsLoginState] = useState(false);

  const validateName = (name) => /^[A-Za-z\s]+$/.test(name); // Letters and spaces allowed
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6; // Minimum 6 characters

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate name
    if (!formData.name) {
      newErrors.name = 'Name is required.';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 3 characters and contain only letters and spaces.';
    }

    // Validate calling name
    if (!formData.callingName) {
        newErrors.callingName = 'Calling name is required.';
      } else if (!validateName(formData.callingName)) {
        newErrors.callingName = 'Calling name must be at least 3 characters and contain only letters and spaces.';
      }

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    // Validate confirm password
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoginState(true);
      const response = await axios.post('http://localhost:5000/signup', formData);
      console.log('Server Response:', response.data);
      setFormData({ name: '', callingName: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
      setIsLoginState(false);
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
    }
  };


  return (
    <div className="flex flex-col no-scrollbar justify-center  gap-[20vh] lg:gap-[15vh] items-center min-h-screen bg-[#000101]">
      <form
        onSubmit={handleSubmit}
        className="lg:bg-[#121212] text-white shadow-md font-body_font rounded px-8 py-6 w-full max-w-md"
      >
          <div className="text-2xl no-scrollbar font-bold flex flex-row font-heading text-[#08618e] text-center mb-6">
                 
                 <Link to="/signup"  className='w-1/2 text-center flex justify-center cursor-pointer'>
                 <h2 className='w-1/2 text-center cursor-pointer'>Join Us</h2>
                 </Link>

                 <Link to="/signin"  className='w-1/2 text-center flex justify-center cursor-pointer'>
                 <h2 className='w-1/2 text-center cursor-pointer'>Sign In</h2>
                 </Link>

             </div>
        
        
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 font-heading">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-1 border ${
              errors.name ? 'border-red-500' : 'border-gray-700'
            } bg-inherit rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.name ? 'focus:ring-red-500' : 'focus:ring-[#08618e]'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Calling Name */}
        <div className="mb-4">
          <label
            htmlFor="callingName"
            className="block text-gray-700 text-sm font-bold mb-2 font-heading"
          >
            Calling Name
          </label>
          <input
            type="text"
            id="callingName"
            value={formData.callingName}
            onChange={handleInputChange}
            className={`w-full px-3 py-1 border ${
              errors.callingName ? 'border-red-500' : 'border-gray-700'
            } bg-inherit rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.callingName ? 'focus:ring-red-500' : 'focus:ring-[#08618e]'
            }`}
            placeholder="Enter the name you want the AI to call you"
          />
          {errors.callingName && (
            <p className="text-red-500 text-sm mt-1">{errors.callingName}</p>
          )}
        </div>

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
            className={`w-full px-3 py-1 border ${
              errors.email ? 'border-red-500' : 'border-gray-700'
            } bg-inherit rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.email ? 'focus:ring-red-500' : 'focus:ring-[#08618e]'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2 font-heading"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-3 py-1 border ${
              errors.password ? 'border-red-500' : 'border-gray-700'
            } bg-inherit rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.password ? 'focus:ring-red-500' : 'focus:ring-[#08618e]'
            }`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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
            className={`w-full px-3 py-1 border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
            } bg-inherit rounded-md text-gray-700 focus:outline-none focus:ring-2 ${
              errors.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-[#08618e]'
            }`}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#08618e] text-[5vw] lg:text-[1.5vw] font-postnobills text-white py-1 px-2 rounded-md"
          disabled={isLoginState}
        >
          {isLoginState ? 'Please wait...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
