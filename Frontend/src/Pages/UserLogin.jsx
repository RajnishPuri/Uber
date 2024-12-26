import { Mail, Lock } from 'lucide-react'
import { useState, useContext } from 'react'
import Uber_Logo_Black from '/Uber_Logo_Black.png'
import Input from "../components/Input"
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../Context/UserContext'
import axios from 'axios'

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(UserDataContext);

    const navigate = useNavigate();

    const formSubmit = async (e) => {
        e.preventDefault();
        const newUserData = { email: email, password: password };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, newUserData);
            console.log(response.data);
            alert('User Logged In Successfully');
            setUser(response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            navigate('/userhome');
        }
        catch (e) {
            console.log(e);
        }

        setEmail('');
        setPassword('');
    };

    const signUpHandler = () => {
        navigate('/userSignup');
    }

    const pilotHandler = () => {
        navigate('/pilotLogin');
    }

    return (
        <div className="py-7 flex flex-col justify-between min-h-screen">
            <div>
                <img className="w-16 mb-1 ml-9" src={Uber_Logo_Black} alt="" />
                <div className="flex flex-col justify-center items-center">
                    <form className="flex flex-col justify-center items-center w-full" onSubmit={formSubmit}>
                        <h3 className="text-xl font-semibold pb-3">What&#39;s Your Email!</h3>
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
                        <button className="w-3/4 bg-black text-white py-3 rounded mt-2">Login</button>
                    </form>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <p className="text-sm text-gray-500">
                        Don&#39;t have an account? <span className="text-blue-500" onClick={signUpHandler}>Sign up</span>
                    </p>
                </div>
                <div className="flex justify-center items-center mt-4 flex-col">
                    <div className="w-1/4 h-px bg-gray-300 mb-2"></div>
                    <button className="w-3/4 bg-blue-500 text-white py-3 rounded mt-2">Continue with Google</button>
                    <button className="w-3/4 bg-blue-500 text-white py-3 rounded mt-2">Continue with Facebook</button>
                    <button className="w-3/4 bg-red-500 text-white py-3 rounded mt-2" onClick={pilotHandler}>Continue As Pilot</button>
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <p className="text-sm text-gray-500">© 2022 Wezire Technologies Inc.</p>
            </div>
        </div>

    )
}

export default UserLogin
