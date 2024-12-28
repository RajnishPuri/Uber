import Uber_Logo_Black from '/Uber_Logo_Black.png'
import { useState } from 'react';
import { ChevronDown } from 'lucide-react'
import { ChevronUp } from 'lucide-react'
import { MapPin } from 'lucide-react';
import LocationSearchPanel from '../components/LocationSearchPanel';
const UserHome = () => {
    const [panel, setPanel] = useState(false);
    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');

    function formSubmitHandler(e) {
        e.preventDefault();

    }
    return (
        <div className='relative h-screen'>
            <img className="w-20 absolute left-5 top-5" src={Uber_Logo_Black} alt="" />
            <div className='h-screen w-screen z-1'>
                <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif' />
            </div>
            <div>
                <div className='  h-screen absolute top-0 w-full flex flex-col justify-end'>
                    <div className=' h-[25%] p-4 bg-white flex flex-col gap-4 justify-center'>
                        <div className='flex justify-between items-center'>

                            <h4 className='text-2xl font-semibold text-center'>Find a Trip</h4>

                            {panel ?
                                <ChevronDown onClick={() => {
                                    setPanel(false);
                                }} /> :
                                null
                            }
                        </div>

                        <form className=' flex flex-col gap-2 w-full ' onSubmit={(e) => {
                            formSubmitHandler(e);
                        }}>
                            <input className=' bg-[#eee] px-8 py-2 text-base rounded-lg w-full' type="text" placeholder='Add Pickup Location' value={pickup} onClick={() => setPanel(true)} onChange={(e) => {
                                setPickup(e.target.value);
                            }} />
                            <div className='h-10 absolute w-1 bg-[#4b4444ee] translate-y-2/3 translate-x-3'></div>
                            <input className=' bg-[#eee] px-8 py-2 text-base rounded-lg w-full' type="text" placeholder='Add Drop Location' onClick={() => setPanel(true)} value={drop} onChange={(e) => {
                                setDrop(e.target.value);
                            }} />
                        </form>
                    </div>
                    {panel ? <div className=' bg-white h-[75%]'>
                        <LocationSearchPanel />
                    </div> : null}


                </div>
            </div>
        </div>


    )
}

export default UserHome