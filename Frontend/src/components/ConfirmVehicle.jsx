import Uber_Car from '/Uber_Car.jpg'
import Uber_Bike from '/Uber_Bike.jpg'
import Uber_Auto from '/Uber_Auto.jpg'
import { MapPin, CreditCard, ChevronDown } from 'lucide-react'


const ConfirmVehicle = ({ setConfirmVehicle, confirmVehicle, destination, pickupLocation }) => {
    return (
        <div>
            <div className='fixed z-10 bottom-0 w-full gap-2 flex flex-col bg-white py-3 px-2 '>
                <div className='flex justify-center'>
                    <h2 className='text-xl font-bold text-center'>Confirm Your Vehicle</h2>
                </div>
                <div className='flex justify-center'>
                    <img
                        className='w-32'
                        src={
                            confirmVehicle.type === "Car"
                                ? Uber_Car
                                : confirmVehicle.type === "Bike"
                                    ? Uber_Bike
                                    : Uber_Auto
                        }
                        alt={confirmVehicle.type}
                    />
                </div>

                <hr className='border-t-2 border-gray-300' />

                <div className="flex items-center gap-2 w-full active:border-black border-2 rounded-lg border-white p-1">
                    <div className="w-fit bg-[#eee] rounded-full p-1">
                        <MapPin />
                    </div>
                    <div>
                        <h4 className="font-bold">{pickupLocation}</h4>
                    </div>
                </div>

                <hr className='border-t-2 border-gray-300' />

                <div className="flex items-center gap-2 w-full active:border-black border-2 rounded-lg border-white p-1">
                    <div className="w-fit bg-[#eee] rounded-full p-1">
                        <MapPin />
                    </div>
                    <div>
                        <h4 className="font-bold">{destination}</h4>
                    </div>
                </div>

                <hr className='border-t-2 border-gray-300' />


                <div className='flex items-center justify-center gap-2 w-full p-1'>
                    <div>
                        <CreditCard className='w-8 h-8' />
                    </div>
                    <div>
                        <h4 className="font-bold text-xl">₹ {confirmVehicle.price}</h4>
                    </div>
                </div>

                <div className='flex justify-center mb-3'>
                    <button className='bg-green-600 text-white px-4 py-2 rounded-md w-1/2' onClick={() => {
                        setConfirmVehicle(false)
                    }}>Confirm</button>
                </div>


            </div>
        </div>
    )
}

export default ConfirmVehicle