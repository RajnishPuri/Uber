import { useState, useEffect } from "react";
import { User } from "lucide-react";
import Uber_Car from '/Uber_Car.jpg';
import Uber_Bike from '/Uber_Bike.jpg';
import Uber_Auto from '/Uber_Auto.jpg';

const VehicleOptionPanel = ({ vehicleData, setVehicleData, status, setStatus }) => {
    const [vehicleOptions, setVehicleOptions] = useState(vehicleData.vehicleDetails || []);


    useEffect(() => {
        // Check if vehicleData has been passed as prop and update the vehicle options
        if (vehicleData && vehicleData.length > 0) {
            setVehicleOptions(vehicleData);
        }
    }, [vehicleData]);

    return (
        <div>
            <div className='fixed z-10 bottom-0 w-full gap-2 flex flex-col bg-white py-3 px-2'>
                <h2 className='text-xl font-bold'>Choose the Vehicle</h2>
                {vehicleOptions.map((option, index) => (
                    <div
                        key={index}
                        className='flex bg-white w-full p-1 border-2 border-gray-400 active:border-black rounded-xl mb-2'
                        onClick={() => {
                            // Handle vehicle selection here, for example:
                            setStatus(`Selected ${option.type}`);
                        }}
                    >
                        <div className='w-[35%]'>
                            <img
                                className='w-28'
                                src={
                                    option.type === "Car"
                                        ? Uber_Car
                                        : option.type === "Bike"
                                            ? Uber_Bike
                                            : Uber_Auto
                                }
                                alt={option.type}
                            />
                        </div>
                        <div className='flex justify-evenly w-[65%]'>
                            <div className='w-3/4'>
                                <div className='flex w-fit items-center gap-1'>
                                    <h4 className='font-semibold text-xl'>{option.type}</h4>
                                    <div className='flex items-center'>
                                        <User className='w-5 h-5' />
                                        <p>{option.seats}</p>
                                    </div>
                                </div>
                                <h4 className='font-extralight text-sm'>{option.seats} Seats</h4>
                                <h4 className='font-extralight text-sm'>{option.distance}</h4>
                                <h4 className='font-extralight text-sm'>{option.timeTaken}</h4> {/* Display time taken */}
                            </div>
                            <div className='w-1/4 text-center'>
                                <h4 className='font-sm text-sm'>₹ {option.price}</h4>
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    className='bg-black text-white rounded-lg p-2'
                    onClick={() => {
                        window.location.reload(); // Reload the page
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default VehicleOptionPanel;
