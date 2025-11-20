import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Login = () => {
    const [state, setState] = useState('signup')

    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>

            {/* Logo */}
            <img
                src={assets.logo}
                alt="logo"
                className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
            />

            {/* Card */}
            <div className='bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-md'>

                {/* Title */}
                <div className='text-center mb-6'>
                    <h2 className='text-3xl font-semibold text-black mb-2'>
                        {state === 'signup' ? 'Create Account' : 'Login'}
                    </h2>
                    <p className='text-gray-700'>
                        {state === 'signup'
                            ? 'Create your account'
                            : 'Login to your account'}
                    </p>
                </div>

                {/* Form */}
                <form>

                    {/* Full Name - only for signup */}
                    {state === 'signup' && (
                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                            <img src={assets.person_icon} alt="person icon" />
                            <input
                                type="text"
                                placeholder='Full Name'
                                required
                                className='bg-transparent outline-none text-white w-full'
                            />
                        </div>
                    )}

                    {/* Email */}
                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                        <img src={assets.mail_icon} alt="mail_icon" />
                        <input
                            type="email"
                            placeholder='Email'
                            required
                            className='bg-transparent outline-none text-white w-full'
                        />
                    </div>

                    {/* Password */}
                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                        <img src={assets.lock_icon} alt="lock_icon" />
                        <input
                            type="password"
                            placeholder='Password'
                            required
                            className='bg-transparent outline-none text-white w-full'
                        />
                    </div>

                    {state === 'login' && (
                        <p className='mb-4 text-indigo-700 cursor-pointer text-sm text-left'>
                            Forgot Password?
                        </p>
                    )}

                    <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium capitalize cursor-pointer'>
                        {state}
                    </button>
                </form>

                {/* Switch links */}
                <p className='text-black-200 text-center text-m mt-4'>
                    {state === 'signup'
                        ? "Already have an account?"
                        : "Don't have an account?"}{' '}
                    <span
                        className='text-blue-900 cursor-pointer underline'
                        onClick={() => setState(state === 'signup' ? 'login' : 'signup')}
                    >
                        {state === 'signup' ? "Login here" : "Sign up"}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login
