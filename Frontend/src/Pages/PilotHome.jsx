import Uber_Logo from '/Uber_Logo.png';
import { useState } from 'react';
import { ChevronDown, Menu, X, ChevronUp } from 'lucide-react';
import PilotAllRides from '../components/PilotAllRides';
import { io } from 'socket.io-client';
import PilotHomeMap from '../components/PilotHomeMap';
import Picking from '../components/Picking';
import Droping from '../components/Droping';

const PilotHome = () => {
    const [rides, setRides] = useState([
        {
            id: 1,
            pickup: "101 Pine Street, New York, NY 10001",
            drop: "456 Elm Street, Los Angeles, CA 90001",
            price: 50,
            vehicle: "Car",
        },
        {
            id: 2,
            pickup: "789 Maple Avenue, Houston, TX 77001",
            drop: "123 Main Street, Springfield, IL 62701",
            price: 50,
            vehicle: "Bike",
        },
        {
            id: 3,
            pickup: "101 Pine Street, New York, NY 10001",
            drop: "456 Elm Street, Los Angeles, CA 90001",
            price: 50,
            vehicle: "Auto",
        },
    ]);

    const [currentRide, setCurrentRide] = useState(null);

    const [status, setStatus] = useState("");
    const [currentLocation, setCurrentLocation] = useState({
        lat: 40.7128,
        lng: -74.0060,
    });



    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmVehicle, setConfirmVehicle] = useState("");
    const [destination, setDestination] = useState("");
    const [pickupLocation, setPickupLocation] = useState("101 Pine Street, New York, NY 10001");
    const [isRiding, setIsRiding] = useState(false);
    const [isRidingConfirmed, setIsRidingConfirmed] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    // const socket = io('https://your-backend-server.com'); // Connect to backend server

    // Toggle the state (active/inactive)
    const toggleStatus = async () => {
        setIsActive(prevState => !prevState);

        // Send the updated status to the backend
        // await socket.emit('update-pilot-status', {
        //     isActive: !isActive
        // });

        // // Optionally, you can handle the response from the backend
        // socket.on('status-updated', (data) => {
        //     console.log('Pilot status updated:', data);
        // });
    };

    const togglePanel = () => {
        setIsPanelOpen(prevState => !prevState);
    };

    const handleLocationChange = (newLocation) => {
        setCurrentLocation(newLocation);
    };

    return (
        <div className="relative h-screen overflow-hidden">
            {/* Logo */}
            <div>
                <div className="absolute z-10 left-1/2 transform -translate-x-1/2 top-2 ">
                    <img className="w-20" src={Uber_Logo} alt="Uber Logo" />
                </div>

                {/* Menu Icon */}
                <div className="absolute z-10 left-5 top-4">
                    <Menu
                        className="w-8 h-8 text-white cursor-pointer"
                        onClick={() => setIsMenuOpen(true)}
                    />
                </div>

                <div className="absolute z-10 right-5 top-6">
                    <div
                        onClick={toggleStatus}
                        className={`relative w-10 h-5 rounded-full cursor-pointer transition-all duration-300 ${isActive ? 'bg-green-600' : 'bg-gray-400'
                            }`}
                    >
                        {/* The ball */}
                        <div
                            className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-white transition-all duration-300 ${isActive ? 'translate-x-5' : 'translate-x-0'
                                }`}
                        ></div>
                    </div>
                </div>


                {/* Navbar */}
                <div className="absolute top-0 z-5 w-full h-16 bg-black opacity-100"></div>
            </div>

            {/* Sidebar Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50`}
            >
                <div className="p-4 flex justify-between items-center bg-gray-100">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <X
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                    />
                </div>
                <ul className="p-4">
                    <li className="py-2 border-b cursor-pointer">Home</li>
                    <li className="py-2 border-b cursor-pointer">Profile</li>
                    <li className="py-2 border-b cursor-pointer">Settings</li>
                    <li className="py-2 border-b cursor-pointer">Logout</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="h-[calc(100%-64px)] mt-16 relative z-1">
                {currentRide === null ? ( // Explicitly check for null (no ride)
                    <PilotHomeMap
                        currentLocation={currentLocation}
                        setCurrentLocation={handleLocationChange}
                    />
                ) : status === "picking" ? (
                    <Picking destination={destination} pickupLocation={pickupLocation} />
                ) : status === "droping" ? (
                    <Droping destination={destination} pickupLocation={pickupLocation} />
                ) : null}
            </div>


            {/* available trips */}
            <div
                className={`fixed bottom-0 w-full bg-white shadow-lg transform transition-transform duration-300 z-30 ${isPanelOpen ? 'translate-y-0' : 'translate-y-[calc(100%-50px)]'
                    }`}
                style={{
                    height: isPanelOpen ? 'calc(100vh - 64px)' : '50px', // Open: full height minus navbar; Closed: small visible strip
                }}
            >
                <div
                    className="flex justify-center items-center h-12 bg-yellow-300 cursor-pointer"
                    onClick={togglePanel}
                >
                    {isPanelOpen ? (
                        <div className=''>
                            <ChevronDown className="w-6 h-6 text-gray-900" />
                        </div>
                    ) : (
                        <div className='w-full h-full flex justify-center items-center gap-3'>
                            <h3 className='text-black font-bold text-xl'>All Rides</h3>
                            <ChevronUp className="w-6 h-6 text-gray-900" />
                        </div>
                    )}
                </div>

                {/* Map/Panel Content */}
                {isPanelOpen && (
                    <div className="h-full overflow-auto">
                        <PilotAllRides currentRide={currentRide} setCurrentRide={setCurrentRide} rides={rides} setRides={setRides} status={status} setStatus={setStatus} />
                    </div>
                )}
            </div>

        </div>
    );
};

export default PilotHome;
