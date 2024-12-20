import { Mail, Lock } from 'lucide-react'
import { useState } from 'react'

import Input from "../components/Input"
const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className=' w-screen h-screen py-10'>
            <div className=' flex flex-col justify-center items-center '>
                <h3 className='text-xl font-semibold pb-3'>Whats Your Email!</h3>
                <Input icon={Mail} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='w-3/4 bg-black text-white py-3 rounded mt-2 '>Login</button>
            </div>
        </div>
    )
}

export default UserLogin
