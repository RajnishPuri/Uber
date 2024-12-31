import Riding from './Riding';
import SearchingMap from './SearchingMap';
import UserHomeMap from './UserHomeMap';
import WaitingForPickup from './WaitingForPickup';
import Uber_Logo_Black from '/Uber_Logo_Black.png';
import { useState } from 'react';

const UserHome = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [isPickupFocused, setIsPickupFocused] = useState(false);
    const [status, setStatus] = useState('');
    const [currentLocation, setCurrentLocation] = useState({
        lat: 40.7128,
        lng: -74.0060,
    });

    function submitHandler(e) {
        e.preventDefault();
        console.log("Pickup:", pickup, "Destination:", destination);
        setStatus('searching');
    }

    const togglePanel = (e) => {
        e.preventDefault();
        setIsExpanded(!isExpanded);
        setPickup('');
        setDestination('');
        setPickupSuggestions([]);
        setDestinationSuggestions([]);
    };

    const handleLocationChange = (newLocation) => {
        setCurrentLocation(newLocation);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log("Pickup:", pickup, "Destination:", destination);
    };

    const fetchSuggestions = async (input, type) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/maps/autocomplete?input=${input}`);
            const data = await response.json();
            console.log('API Response:', data);

            const suggestions = data.suggestions || [];
            if (type === 'pickup') {
                setPickupSuggestions(suggestions);
            } else {
                setDestinationSuggestions(suggestions);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleInputChange = (e, type) => {
        const value = e.target.value;
        if (type === 'pickup') {
            setPickup(value);
            fetchSuggestions(value, 'pickup');
        } else {
            setDestination(value);
            fetchSuggestions(value, 'destination');
        }
    };

    const handleSuggestionClick = (suggestion, type) => {
        if (type === 'pickup') {
            setPickup(suggestion.description);
            setPickupSuggestions([]);
        } else {
            setDestination(suggestion.description);
            setDestinationSuggestions([]);
        }
    };

    return (
        <div className="relative h-screen overflow-hidden">
            {/* Uber Logo */}
            <img className="w-20 absolute left-5 top-5" src={Uber_Logo_Black} alt="Uber Logo" />

            {/* Map Section */}
            {/* UserHomeMap - sabse pehle khud ka location map par dikh rha hoga , WaitingForPickup - jab driver aa rha hoga tab ka map, riding - ride start ho chuka hoga, SearchingMap - jab search kar rha hoga tab ka map */}
            <div className="h-[calc(100%-80px)] w-full z-0">
                {status === '' ?
                    <UserHomeMap currentLocation={currentLocation}
                        setCurrentLocation={handleLocationChange} />
                    :
                    status === 'waitingforpickup' ?
                        <WaitingForPickup />
                        :
                        status === 'riding' ?
                            <Riding />
                            : <SearchingMap />
                }
            </div>

            {/* Bottom Panel */}
            {/* DriverInfoForPickup - jab driver pick krne aayega toh otp ke sath driver ka info, RidingData - jab ride start hoga toh ride ka data, searching - jab ride initialize kiya hoga toh searching map aaega */}
            {status === '' ? (
                <div
                    className={`absolute bottom-0 w-full bg-white z-10 transition-all duration-300 ${isExpanded ? 'h-screen' : 'h-[25%]'} flex flex-col `}
                >

                    {/* Header for Expanded View */}
                    <div>
                        <h3 className="text-lg font-bold px-4 py-2">Find Your Ride</h3>
                        {/* Form */}
                        <form
                            className="flex flex-col gap-4 px-4 py-4"
                            onSubmit={formSubmitHandler}
                        >
                            <input
                                type="text"
                                placeholder="Add Pickup Location"
                                className="bg-gray-200 px-4 py-2 rounded-lg"
                                value={pickup}
                                aria-label="Pickup Location"
                                onFocus={() => {
                                    setIsExpanded(true);
                                    setIsPickupFocused(true);
                                }}
                                onChange={(e) => handleInputChange(e, 'pickup')}
                            />

                            <input
                                type="text"
                                placeholder="Add Drop Location"
                                className="bg-gray-200 px-4 py-2 rounded-lg"
                                value={destination}
                                aria-label="Drop Location"
                                onFocus={() => {
                                    setIsExpanded(true);
                                    setIsPickupFocused(false);
                                }}
                                onChange={(e) => handleInputChange(e, 'destination')}
                            />

                            {isExpanded && (
                                <div className="flex justify-between">
                                    <button
                                        className="bg-black text-white px-8 py-2 rounded-lg"
                                        onClick={submitHandler}
                                    >
                                        Find a Trip
                                    </button>
                                    <button
                                        className="bg-gray-200 px-8 py-2 rounded-lg"
                                        onClick={togglePanel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                    <div className='h-full'>
                        {isPickupFocused && pickupSuggestions.length > 0 && (
                            <div className="bg-white shadow-md rounded-lg h-full overflow-y-auto">
                                {pickupSuggestions.map((suggestion, index) => (
                                    <div
                                        key={suggestion.place_id || index} // Ensure a unique key
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => {
                                            handleSuggestionClick(suggestion, 'pickup')
                                            console.log(suggestion);
                                        }}
                                    >
                                        {suggestion.description || 'No description available'} {/* Adjust if needed */}
                                    </div>
                                ))}
                            </div>
                        )}

                        {!isPickupFocused && destinationSuggestions.length > 0 && (
                            <div className="bg-white shadow-md rounded-lg h-full overflow-y-auto">
                                {destinationSuggestions.map((suggestion, index) => (
                                    <div
                                        key={suggestion.place_id || index} // Ensure a unique key
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSuggestionClick(suggestion, 'destination')}
                                    >
                                        {suggestion.description || 'No description available'} {/* Adjust if needed */}
                                    </div>
                                ))}
                            </div>
                        )}



                    </div>

                </div>
            ) : status === 'searching' ?
                (<div>
                    <div className="flex flex-col items-center justify-center h-screen">
                        <div className="text-4xl font-bold mb-4">Searching for a trip...</div>
                        <div className="text-gray-600">Please wait while we find the perfect trip for you.</div>
                    </div>
                </div>
                ) :
                status === 'waitingforpickup' ? (<DriverInfoForPickup />) :
                    status === 'riding' ? (<RidingData />) : null
            }
        </div>
    );
};

export default UserHome;
