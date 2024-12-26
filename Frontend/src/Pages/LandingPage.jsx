import Uber_Logo from '/Uber_Logo.png'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div>
            <div className="bg-cover bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full pt-8 bg-red-400 flex flex-col justify-between">
                <img className='w-20 ml-8' src={Uber_Logo} alt="" />
                <div className="bg-white py-4 px-4 pb-7">
                    <h2 className=' text-2xl font-bold'>Get Started With Uber</h2>
                    <Link to='/userLogin' className='flex justify-center items-center w-full bg-black text-white py-3 rounded mt-5  '>Continue</Link>
                </div>

            </div>

        </div>
    )
}

export default LandingPage
