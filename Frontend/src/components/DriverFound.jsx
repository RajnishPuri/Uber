import { MapPin, MapPinHouse, IndianRupee, Lock } from "lucide-react";
import Uber_Car from '/Uber_Car.jpg';
import Uber_Bike from '/Uber_Bike.jpg';
import Uber_Auto from '/Uber_Auto.jpg';

const DriverFound = ({ driverData, setConfirmVehicle, setDriverData, setIsRiding }) => {



    return (
        <div className="text-center ">

            <>
                <div className="flex justify-between p-3">
                    <div className="">

                        <img
                            className="w-32"
                            src={
                                driverData.vehicleType === 'Car'
                                    ? Uber_Car
                                    : driverData.vehicleType === 'Bike'
                                        ? Uber_Bike
                                        : Uber_Auto
                            }
                            alt={driverData.vehicleType}
                        />
                    </div>
                    <div className=" flex justify-end gap-1">
                        <div className="flex items-center gap-2">

                            <img className="w-12 h-12" src={driverData.image} alt="Driver" />
                        </div>
                        <div>

                            <h2 className="font-bold text-xl text-end">{driverData.name}</h2>
                            <h3 className="text-gray-900 text-end font-bold text-xl">{driverData.vehicleNumber}</h3>
                            <h3 className="text-gray-500 text-end">{driverData.vehicleDetails}</h3>
                        </div>
                    </div>
                </div>



                <div className="flex items-center gap-2 w-full active:border-black border-2 rounded-lg border-white p-3">
                    <div className="w-fit bg-[#eee] rounded-full p-1">
                        <MapPin />
                    </div>
                    <div>
                        <h4 className="font-bold">{driverData.pickupLocation}</h4>
                    </div>
                </div>

                <hr className="border-t-2 border-gray-300" />

                <div className="flex items-center gap-2 w-full active:border-black border-2 rounded-lg border-white p-3">
                    <div className="w-fit bg-[#eee] rounded-full p-1">
                        <MapPinHouse />
                    </div>
                    <div>
                        <h4 className="font-bold">{driverData.destination}</h4>
                    </div>
                </div>

                <hr className="border-t-2 border-gray-300" />

                <div className="flex items-center gap-2 w-full p-3 justify-between">
                    <div className="flex items-center">
                        <IndianRupee className="w-8 h-8" />
                        <h4 className="font-bold text-xl"> {driverData.fare}</h4>
                    </div>
                    <div>
                        <h4 className="font-bold text-xl"> {driverData.paymentMethod}</h4>
                    </div>
                </div>

                <hr className="border-t-2 border-gray-300" />

                <div className="flex justify-between p-3">
                    <div className=" flex items-center gap-3">
                        <Lock />
                        <h4 className="text-center font-semibold text-lg">
                            OTP
                        </h4>
                    </div>
                    <div>
                        <h4 className="text-center font-bold text-lg">
                            {driverData.otp}
                        </h4>

                    </div>
                </div>

                <div className="flex justify-center mb-3">
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded-md w-1/2"
                        onClick={() => {
                            setConfirmVehicle(false);
                            setDriverData(null);
                            setIsRiding(false);

                        }}
                    >
                        Cancel Ride
                    </button>
                </div>
            </>
        </div>
    );
};

export default DriverFound;

