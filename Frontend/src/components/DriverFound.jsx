import React from 'react'

const DriverFound = ({ driverData }) => {
    return (
        <div className="text-center">

            <p className="text-lg">Name: {driverData.name}</p>
            <p className="text-lg">Phone: {driverData.phone}</p>
            <p className="text-lg">Vehicle: {driverData.vehicleDetails}</p>
        </div>
    );
};

export default DriverFound;

