import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { User } from "lucide-react";
import Uber_Car from '/Uber_Car.jpg';
import Uber_Bike from '/Uber_Bike.jpg';
import Uber_Auto from '/Uber_Auto.jpg';
import ConfirmVehicle from "./ConfirmVehicle";

// const socket = io("http://localhost:3000"); 

const VehicleOptionPanel = ({ vehicleData, pickup, destination, status, setStatus }) => {
    const [vehicleOptions, setVehicleOptions] = useState(vehicleData.vehicleDetails || []);
    const [loading, setLoading] = useState(false);
    const [rideId, setRideId] = useState(null);
    const navigate = useNavigate();
    const [confirmVehicle, setConfirmVehicle] = useState(false);
    const [rideData, setRideData] = useState(null);

    const clickHandler = async (option) => {
        setLoading(true);
        const distance = parseFloat(option.distance.split(' ')[0]);

        try {
            // const response = await fetch('http://localhost:3000/api/v1/ride/create-ride', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: `Bearer ${localStorage.getItem('token')}`,
            //     },
            //     body: JSON.stringify({
            //         pickup,
            //         destination,
            //         type: option.type,
            //         price: option.price,
            //         distance,
            //     }),
            // });

            const data = {
                pickup,
                destination,
                type: option.type,
                price: option.price,
                distance,
            };
            setRideData(data);
            console.log(data);
            setConfirmVehicle(true);

            // if (data.rideId) {
            //     setRideId(data.rideId); // Save ride ID
            //     socket.emit("join-ride", data.rideId); // Join ride room
            // }
        } catch (error) {
            console.error("Error creating ride:", error);
        }
    };

    // useEffect(() => {
    //     // Listen for driver acceptance event
    //     socket.on("driver-accepted", (driverDetails) => {
    //         console.log("Driver accepted:", driverDetails);
    //         setLoading(false); // Hide loader
    //         navigate('/driverfound', { state: { driver: driverDetails, rideId } });
    //     });

    //     // Cleanup on unmount
    //     return () => {
    //         socket.off("driver-accepted");
    //     };
    // }, [navigate, rideId]);

    useEffect(() => {
        if (vehicleData && vehicleData.length > 0) {
            setVehicleOptions(vehicleData);
        }
    }, [vehicleData]);

    return (
        <div>
            {!confirmVehicle ? (
                <div className='fixed z-10 bottom-0 w-full gap-2 flex flex-col bg-white py-3 px-2'>
                    <h2 className='text-xl font-bold'>Choose the Vehicle</h2>
                    {vehicleOptions.map((option, index) => (
                        <div
                            key={index}
                            className='flex bg-white w-full p-1 border-2 border-gray-400 active:border-black rounded-xl mb-2'
                            onClick={() => clickHandler(option)}
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
                                    <h4 className='font-extralight text-sm'>{option.timeTaken}</h4>
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
                            window.location.reload();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            ) : (<ConfirmVehicle rideData={rideData} status={status} setStatus={setStatus} />)}
        </div>
    );
};

export default VehicleOptionPanel;
