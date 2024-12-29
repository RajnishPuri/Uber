import { useState, useEffect } from "react";
import { User } from "lucide-react";
import Uber_Car from '/Uber_Car.jpg';
import Uber_Bike from '/Uber_Bike.jpg';
import Uber_Auto from '/Uber_Auto.jpg';

const VehicleOptionPanel = ({ setVehiclePanel, confirmVehicle, setConfirmVehicle }) => {
    const [vehicleOptions, setVehicleOptions] = useState([
        {
            "type": "Car",
            "seats": 4,
            "distance": "2 min away",
            "price": 100
        },
        {
            "type": "Bike",
            "seats": 1,
            "distance": "5 min away",
            "price": 200
        },
        {
            "type": "Auto",
            "seats": 3,
            "distance": "7 min away",
            "price": 50
        }
    ]);

    useEffect(() => {
        // Fetch data from backend
        const fetchData = async () => {
            try {
                // const response = await fetch("https://your-backend-api.com/vehicle-options");
                // const data = await response.json();
                // setVehicleOptions(data);
            } catch (error) {
                console.error("Error fetching vehicle data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className='fixed z-10 bottom-0 w-full gap-2 flex flex-col bg-white py-3 px-2'>
                <h2 className='text-xl font-bold'>Choose the Vehicle</h2>
                {vehicleOptions.map((option, index) => (
                    <div
                        key={index}
                        className='flex bg-white w-full p-1 border-2 border-gray-400 active:border-black rounded-xl mb-2'
                        onClick={() => {
                            setConfirmVehicle(option);
                            setVehiclePanel(false);
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
                            </div>
                            <div className='w-1/4 text-center'>
                                <h4 className='font-medium text-lg'>₹ {option.price}</h4>
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    className='bg-black text-white rounded-lg p-2'
                    onClick={() => {
                        setVehiclePanel(false);
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default VehicleOptionPanel;
