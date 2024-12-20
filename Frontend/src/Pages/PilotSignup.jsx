import { useState } from 'react'
import Uber_Logo_Black from '/Uber_Logo_Black.png'
import Input from "../components/Input"
import PasswordStrengthMeter from "../components/PasswordStrengthMeter"
import { Mail, Lock, User, Car, Armchair, PaintBucket, Book } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Select from '../components/Select'
import { set, z } from 'zod'


const PilotSignup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [pilotData, setPilotData] = useState({});


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
        setPilotData({
            fullName: {
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password,
            vehicleColor: vehicleColor,
            vehicleNumber: vehicleNumber,
            vehicleType: selectedOption,
            vehicleCapacity: selectedCapacity
        })

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setVehicleColor('');
        setVehicleNumber('');
        setSelectedOption('');
        setSelectedCapacity('');
    }

    const loginHandler = () => {
        navigate('/pilotLogin');
    }

    const userHandler = () => {
        navigate('/userLogin');
    }

    const options = [
        { value: '', label: 'Enter Vehicle Type' }, // Placeholder option
        { value: 'car', label: 'Car' },
        { value: 'bike', label: 'Bike' },
        { value: 'auto', label: 'Auto' },
    ];

    const [selectedOption, setSelectedOption] = useState('');

    const capacityOptions = [
        { value: '', label: 'Enter Vehicle Capacity' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
    ];

    const [selectedCapacity, setSelectedCapacity] = useState('');


    return (
        <div className="py-7 flex flex-col justify-between min-h-screen" >
            <div>
                <img className="w-16 mb-1 ml-9" src={Uber_Logo_Black} alt="" />
                <div className="flex flex-col justify-center items-center">
                    <form className="flex flex-col justify-center items-center w-full" onSubmit={submitHandler}>
                        <h3 className="text-xl font-semibold pb-3">Register as a Pilot!</h3>
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
                        <Select

                            icon={Car}
                            options={options}
                            required
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                        />

                        <Select
                            icon={Armchair}
                            required
                            options={capacityOptions}
                            value={selectedCapacity}
                            onChange={(e) => setSelectedCapacity(e.target.value)}
                        />

                        <Input
                            icon={PaintBucket}
                            type="text"
                            required
                            placeholder="Vehicle Colour"
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                        />

                        <Input
                            icon={Book}
                            type="text"
                            required
                            placeholder="Vehicle Plate Number"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                        />




                        <PasswordStrengthMeter password={password} />

                        <button className="w-3/4 bg-black text-white py-3 rounded mt-2">Sign Up</button>
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
                    <button className="w-3/4 bg-yellow-500 text-white py-3 rounded mt-2" onClick={userHandler} >Continue As User</button>
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <p className="text-sm text-gray-500">© 2022 Wezire Technologies Inc.</p>
            </div>
        </div >
    )
}

export default PilotSignup