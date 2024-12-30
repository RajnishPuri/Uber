import { useState } from "react";
import Card from "./Card";

const PilotAllRides = ({ currentRide, setCurrentRide, rides, setRides, status, setStatus }) => {
    // Handle Accept
    const handleAccept = (id) => {
        setCurrentRide(id);
        console.log(`Ride with ID ${id} accepted.`);
        setStatus("picking");
        // Add logic to notify the backend
    };

    // Handle Reject
    const handleReject = (id) => {
        setRides(rides.filter((ride) => ride.id !== id));
        console.log(`Ride with ID ${id} rejected.`);
        // Add logic to notify the backend
    };

    // Handle End Ride
    const endRide = (id) => {
        setCurrentRide(null); // Reset currentRide to null
        setStatus("");
        setRides(rides.filter((ride) => ride.id !== id));
        console.log(`Ride with ID ${id} ended.`);
        // Add logic to notify the backend
    };

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
                        />
                        <button
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                            onClick={() => setStatus("droping")}
                        >
                            Submit OTP
                        </button>
                    </>
                ) : status === "droping" ? (
                    <>
                        <h2 className="text-lg font-bold">Dropping Off</h2>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => endRide(currentRide)}
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
                            key={ride.id}
                            ride={ride}
                            onAccept={() => handleAccept(ride.id)}
                            onReject={() => handleReject(ride.id)}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default PilotAllRides;
