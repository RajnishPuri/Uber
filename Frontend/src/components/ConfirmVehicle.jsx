import Uber_Car from '/Uber_Car.jpg';
import Uber_Bike from '/Uber_Bike.jpg';
import Uber_Auto from '/Uber_Auto.jpg';
import { MapPin, CreditCard, ChevronDown } from 'lucide-react';
import { useState, useEffect, useContext } from 'react';
import DriverFound from './DriverFound';
import Uber_Driver from '/Uber_Driver.png';
import { SocketContext } from '../Context/SocketContext';

const ConfirmVehicle = ({ rideData, status, setStatus }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isLookingForDriver, setIsLookingForDriver] = useState(false);
    const [driverData, setDriverData] = useState(null);

    const [isHidden, setIsHidden] = useState(false);

    const toggleVisibility = () => {
        setIsHidden((prev) => !prev);
    };

    const { sendMessage, receiveMessage, socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on('ride-confirmed', (data, otp) => {
            console.log('Ride confirmed:', data);
            setDriverData(data);
        });
    })

    const driverDetailDemo = {
        name: 'John Doe',
        phone: '123-456-7890',
        vehicleDetails: 'Toyota Corolla',
        vehicleType: 'Car',
        vehicleNumber: 'BR01YF5456',
        rating: 4.5,
        distance: '5 miles',
        time: '10 minutes',
        fare: '200',
        paymentMethod: 'Credit Card',
        destination: '123 Main St, City, State',
        pickupLocation: '456 Elm St, City, State',
        image: Uber_Driver,
        otp: '1234',
    };


    const submitHandler = async () => {
        setIsLookingForDriver(true);

        const dataToSend = rideData;

        console.log('Searching for driver with data:', dataToSend);

        setTimeout(async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/ride/create-ride', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        pickup: rideData.pickup,
                        destination: rideData.destination,
                        type: rideData.type,
                        price: rideData.price,
                        distance: rideData.distance,
                        paymentMethod: paymentMethod,
                    }),
                });
                const data = await response.json();
                console.log(data);
                // Set the fetched driver data
                // setDriverData(driverDetailDemo);
                // setIsRiding(true);

            } catch (error) {
                console.error('Error fetching driver details:', error);
            }


        }, 3000);
    };

    const cancelHandler = () => {
        // setIsLookingForDriver(false);
        // setConfirmVehicle(false);

        window.location.reload(); // Reload the page

    };

    return (
        <div>
            <div className="fixed z-10 bottom-0 w-full gap-2 flex flex-col bg-white py-3 px-2">
                <div className="w-full flex justify-center items-center">
                    <ChevronDown className="text-gray-500" onClick={toggleVisibility} />
                </div>
                <div className={`${isHidden ? "hidden" : ""}`}>
                    <div className="flex justify-center">
                        <h2 className="text-xl font-bold text-center">
                            {isLookingForDriver ?
                                driverData ? 'Driver Found!' : 'Looking for Driver...'
                                : 'Confirm Your Vehicle'}
                        </h2>
                    </div>

                    {isLookingForDriver ? (
                        driverData ? (
                            <DriverFound driverData={driverData} />
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-4 mt-4">
                                <div className="loader border-4 border-t-green-600 border-gray-300 rounded-full w-12 h-12 animate-spin"></div>
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded-md w-1/2"
                                    onClick={cancelHandler}
                                >
                                    Cancel
                                </button>
                            </div>
                        )
                    ) : (
                        <>
                            <div className="flex justify-center ">
                                <img
                                    className="w-32"
                                    src={
                                        rideData.type === 'Car'
                                            ? Uber_Car
                                            : rideData.type === 'Bike'
                                                ? Uber_Bike
                                                : Uber_Auto
                                    }
                                    alt={rideData.type}
                                />
                            </div>

                            <hr className="border-t-2 border-gray-300" />

                            <div className="flex items-center gap-2 w-full active:border-black border-2 rounded-lg border-white p-1">
                                <div className="w-fit bg-[#eee] rounded-full p-1">
                                    <MapPin />
                                </div>
                                <div>
                                    <h4 className="font-bold">{rideData.pickup}</h4>
                                </div>
                            </div>

                            <hr className="border-t-2 border-gray-300" />

                            <div className="flex items-center gap-2 w-full active:border-black border-2 rounded-lg border-white p-1">
                                <div className="w-fit bg-[#eee] rounded-full p-1">
                                    <MapPin />
                                </div>
                                <div>
                                    <h4 className="font-bold">{rideData.destination}</h4>
                                </div>
                            </div>

                            <hr className="border-t-2 border-gray-300" />

                            <div className="flex items-center justify-center gap-2 w-full p-1">
                                <CreditCard className="w-8 h-8" />
                                <h4 className="font-bold text-xl">₹ {rideData.price}</h4>
                            </div>

                            <hr className="border-t-2 border-gray-300" />

                            <div className="flex justify-center gap-2">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="payment-method-1"
                                        name="payment-method"
                                        value="credit-card"
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <label htmlFor="payment-method-1">Credit Card</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="payment-method-2"
                                        name="payment-method"
                                        value="debit-card"
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <label htmlFor="payment-method-2">Debit Card</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="payment-method-3"
                                        name="payment-method"
                                        value="cash"
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <label htmlFor="payment-method-3">Cash</label>
                                </div>
                            </div>

                            <div className="flex justify-center mb-3">
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded-md w-1/2"
                                    onClick={submitHandler}
                                    disabled={!paymentMethod}
                                >
                                    Confirm
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div >
        </div >
    );
};

export default ConfirmVehicle;
