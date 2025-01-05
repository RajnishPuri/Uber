import { Mail, Lock } from 'lucide-react'
import { useState, useContext } from 'react'
import Uber_Logo_Black from '/Uber_Logo_Black.png'
import Input from "../components/Input"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { PilotDataContext } from '../Context/PilotContext'
const PilotLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { pilot, setPilot } = useContext(PilotDataContext);

    const navigate = useNavigate();

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPilotData = { email, password };
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/pilot/login`, newPilotData);

            console.log(response.data);

            if (response.data.success) {
                alert(response.data.message || 'Pilot Logged In Successfully');

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);

                const formattedPilot = {
                    fullName: {
                        firstName: response.data.pilot.fullName?.firstName || "",
                        lastName: response.data.pilot.fullName?.lastName || ""
                    },
                    email: response.data.pilot.email || "",
                    vehicleColor: response.data.pilot.vehicle?.color || "",
                    vehicleNumber: response.data.pilot.vehicle?.plate || "",
                    vehicleType: response.data.pilot.vehicle?.vehicleType || "",
                    vehicleCapacity: response.data.pilot.vehicle?.capacity || "",
                    _id: response.data.pilot._id || ""
                };

                localStorage.setItem('firstName', response.data.pilot.fullName?.firstName);
                localStorage.setItem('lastName', response.data.pilot.fullName?.lastName);
                localStorage.setItem('email', response.data.pilot.email);
                localStorage.setItem('userId', response.data.pilot._id);
                localStorage.setItem('vehicleColor', response.data.pilot.vehicle?.color);
                localStorage.setItem('vehicleNumber', response.data.pilot.vehicle?.plate);
                localStorage.setItem('vehicleType', response.data.pilot.vehicle?.vehicleType);
                localStorage.setItem('vehicleCapacity', response.data.pilot.vehicle?.capacity);
                localStorage.setItem('_id', response.data.pilot._id);


                setPilot(formattedPilot);

                setEmail('');
                setPassword('');

                navigate('/pilothome');
            } else {
                alert('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('An error occurred during login. Please try again later.');
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
