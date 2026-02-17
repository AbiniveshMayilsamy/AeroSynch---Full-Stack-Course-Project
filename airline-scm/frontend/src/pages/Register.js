import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Building, Eye, EyeOff } from 'lucide-react';
import logo from '../utils/logo.png';
import BackgroundVideo from '../components/BackgroundVideo';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      console.log('Register response:', response);
      toast.success('Registration successful!');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 100);
    } catch (error) {
      console.error('Register error:', error);
      toast.error(error.response?.data?.message || error.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen rough-gradient flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <BackgroundVideo />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="h-20 w-40 rounded-2xl object-cover floating shadow-2xl hover:scale-110 transition-transform duration-300" />
        </div>
        <h2 className="mt-6 text-center text-4xl font-bold" style={{color: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.6), 0 0 60px rgba(96, 165, 250, 0.4)'}}>
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Or{' '}
          <Link to="/login" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
            sign in to existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="shiny-card py-10 px-8 rounded-3xl">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('firstName', {
                      required: 'First name is required'
                    })}
                    type="text"
                    className="input-field pl-12"
                    placeholder="First name"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-400">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Last Name
                </label>
                <div>
                  <input
                    {...register('lastName', {
                      required: 'Last name is required'
                    })}
                    type="text"
                    className="input-field"
                    placeholder="Last name"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-400">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  className="input-field pl-12"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Department
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  {...register('department', {
                    required: 'Department is required'
                  })}
                  className="input-field pl-12"
                >
                  <option value="">Select Department</option>
                  <option value="supply-chain">Supply Chain</option>
                  <option value="inventory">Inventory Management</option>
                  <option value="procurement">Procurement</option>
                  <option value="logistics">Logistics</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="operations">Operations</option>
                </select>
              </div>
              {errors.department && (
                <p className="mt-2 text-sm text-red-400">{errors.department.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className="input-field pl-12 pr-12"
                  placeholder="Create password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="input-field pl-12 pr-12"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;