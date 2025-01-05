import { useEffect, useState, useContext } from "react";
import Card from "./Card";
import axios from "axios";

import { SocketContext } from "../Context/SocketContext";


const PilotAllRides = ({ currentRide, setCurrentRide, rides, setRides, status, setStatus }) => {
    const [otp, setOtp] = useState('');
    const [rideId, setRideId] = useState('');
    const { socket, sendMessage, receiveMessage } = useContext(SocketContext);

    // Handle Accept
    const handleAccept = async (id) => {
        try {
            // Send the POST request to confirm the ride
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/ride/confirm-ride/${id}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            // Check if the response is successful
            if (response.status === 200) {
                console.log(response.data);

                // Update local state based on the response
                setRideId(id);
                setStatus("picking"); // Ensure the status is set to "picking"
                setCurrentRide(response.data.ride); // Set the current ride after acceptance
                console.log(`Ride with ID ${id} accepted.`);
            } else {
                console.error("Failed to accept the ride:", response.data.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error accepting the ride:", error.response?.data?.message || error.message);
        }
    };

    // Handle Reject
    const handleReject = (id) => {
        setRides(rides.filter((ride) => ride._id !== id));
        console.log(`Ride with ID ${id} rejected.`);
    };

    // Handle End Ride
    const endRide = (id) => {
        setCurrentRide(null); // Reset currentRide to null
        setStatus("");
        setRides(rides.filter((ride) => ride._id !== rideId));
        console.log(`Ride with ID ${id} ended.`);
    };

    async function submitOtp(e) {
        e.preventDefault();
        console.log(`OTP submitted: ${otp}`);

        const Response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/start-ride/${rideId}`, {
            otp
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log(Response);
        setStatus("dropping"); // Change status to "dropping" after successful OTP submission
    }

    useEffect(() => {
        socket.on("ride-started", (data) => {
            console.log("Ride accepted:", data);
            setStatus('dropping');
        });
    }, [socket]);

    return (
        <div className="p-4">
            {currentRide ? (
                status === "picking" ? (
                    <>
                        <h2 className="text-lg font-bold">Enter User OTP</h2>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="mt-4 px-4 py-2 border rounded w-full"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={4}
                            required
                        />
                        <button
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                            onClick={submitOtp}
                            disabled={!otp || otp.length !== 4}
                        >
                            Submit OTP
                        </button>
                    </>
                ) : status === "dropping" ? (
                    <>
                        <h2 className="text-lg font-bold">Dropping Off</h2>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => endRide()}
                        >
                            Drop Here
                        </button>
                    </>
                ) : (
                    <h2 className="text-lg font-bold">Ride Completed</h2>
                )
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4">Available Rides</h1>
                    {rides.map((ride) => (
                        <Card
                            key={ride._id}
                            ride={ride}
                            onAccept={() => handleAccept(ride._id)}
                            onReject={() => handleReject(ride._id)}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default PilotAllRides;
