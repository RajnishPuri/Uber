import { useState } from 'react'
import Uber_Logo_Black from '/Uber_Logo_Black.png'
import Input from "../components/Input"
import PasswordStrengthMeter from "../components/PasswordStrengthMeter"

import { Mail, Lock, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'


const UserSignup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userData, setUserData] = useState({});

    const passwordSchema = z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character");

    const signupSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: passwordSchema,
        confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    }).refine(data => data.password === data.confirmPassword, {
        message: "Password and Confirm Password should be the same",
        path: ["confirmPassword"],
    });


    const submitHandler = (e) => {
        e.preventDefault();
        const validationResult = signupSchema.safeParse({ email, password, confirmPassword });
        if (!validationResult.success) {
            alert(validationResult.error.errors.map(err => err.message).join(", "));
            return;
        }
        setUserData({
            fullName: {
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password
        })
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

    }

    const loginHandler = () => {
        navigate('/userLogin');
    }

    const pilotHandler = () => {
        navigate('/pilotLogin');
    }

    return (
        <div className="py-7 flex flex-col justify-between min-h-screen" >
            <div>
                <img className="w-16 mb-1 ml-9" src={Uber_Logo_Black} alt="" />
                <div className="flex flex-col justify-center items-center">
                    <form className="flex flex-col justify-center items-center w-full" onSubmit={submitHandler}>
                        <h3 className="text-xl font-semibold pb-3">Register Yourself!</h3>
                        <Input
                            icon={User}
                            type="text"
                            required
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                            icon={User}
                            type="text"
                            required
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <Input
                            icon={Mail}
                            type="email"
                            required
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            icon={Lock}
                            type="password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            icon={Lock}
                            type="password"
                            required
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <PasswordStrengthMeter password={password} />
                        <button className="w-3/4 bg-black text-white py-3 rounded mt-2">Login</button>
                    </form>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <p className="text-sm text-gray-500">
                        have an account? <span className="text-blue-500" onClick={loginHandler}>Login</span>
                    </p>
                </div>
                <div className="flex justify-center items-center mt-4 flex-col">
                    <div className="w-1/4 h-px bg-gray-300 mb-2"></div>
                    <button className="w-3/4 bg-blue-500 text-white py-3 rounded mt-2">Continue with Google</button>
                    <button className="w-3/4 bg-blue-500 text-white py-3 rounded mt-2">Continue with Facebook</button>
                    <button className="w-3/4 bg-red-500 text-white py-3 rounded mt-2" onClick={pilotHandler} >Continue As Pilot</button>
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <p className="text-sm text-gray-500">© 2022 Wezire Technologies Inc.</p>
            </div>
        </div >
    )
}

export default UserSignup