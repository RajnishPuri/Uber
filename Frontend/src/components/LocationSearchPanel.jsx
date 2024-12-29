import { MapPin } from "lucide-react";

const LocationSearchPanel = ({ locations, vehiclePanel, setVehiclePanel, setPanel, setDestination, setPickupLocation }) => {
    return (
        <div className="flex justify-center h-full p-2">
            <div className="flex flex-col gap-4 w-full">
                {locations.map((location, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 w-full active:border-black border-2 rounded-lg border-white p-1"
                        onClick={() => {
                            setVehiclePanel(true);
                            setPanel(false)
                            setDestination(location.address);
                        }
                        }
                    >
                        <div className="w-fit bg-[#eee] rounded-full p-1">
                            <MapPin />
                        </div>
                        <div>
                            <h4 className="font-medium">{location.address}</h4>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default LocationSearchPanel;
