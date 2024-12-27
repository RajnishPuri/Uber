import { Mail, Lock } from 'lucide-react'
import { useState } from 'react'
import Uber_Logo_Black from '/Uber_Logo_Black.png'
import Input from "../components/Input"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const PilotLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPilotData = { email: email, password: password };
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/pilot/login`, newPilotData);
            alert('Pilot Logged In Successfully');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            setEmail('');
            setPassword('');
            navigate('/pilothome');
        }
        catch (e) {
            console.log(e);
        }
    };

    const pilotSignUpHandler = () => {
        navigate('/pilotSignup');
    }

    const userHandler = () => {
        navigate('/userLogin');
    }

    return (
        <div className="py-7 flex flex-col justify-between min-h-screen">
            <div>
                <img className="w-16 mb-1 ml-9" src={Uber_Logo_Black} alt="" />
                <div className="flex flex-col justify-center items-center">
                    <form className="flex flex-col justify-center items-center w-full" onSubmit={formSubmit}>
                        <h3 className="text-xl font-semibold pb-3">What&#39;s Your Pilot Email!</h3>
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
                        Join a Fleet? <span className="text-red-500" onClick={pilotSignUpHandler}>Regiter as Pilot</span>
                    </p>
                </div>
                <div className="flex justify-center items-center mt-4 flex-col">
                    <div className="w-1/4 h-px bg-gray-300 mb-2"></div>
                    <button className="w-3/4 bg-blue-500 text-white py-3 rounded mt-2">Continue with Google</button>
                    <button className="w-3/4 bg-blue-500 text-white py-3 rounded mt-2">Continue with Facebook</button>
                    <button className="w-3/4 bg-yellow-500 text-white py-3 rounded mt-2" onClick={userHandler}>Continue As User</button>
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <p className="text-sm text-gray-500">© 2022 Wezire Technologies Inc.</p>
            </div>
        </div>

    )
}

export default PilotLogin
