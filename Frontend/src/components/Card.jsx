const Card = ({ ride, onAccept, onReject }) => {
    const { pickup, drop, price, vehicle } = ride;

    return (
        <div className="border p-4 mb-4 shadow-md rounded-md">
            <h2 className="text-lg font-bold mb-2">Ride Details</h2>
            <p><strong>Pickup:</strong> {pickup}</p>
            <p><strong>Drop:</strong> {drop}</p>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>Vehicle:</strong> {vehicle}</p>
            <div className="mt-4 flex gap-2">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={onAccept}
                >
                    Accept
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={onReject}
                >
                    Reject
                </button>
            </div>
        </div>
    );
};

export default Card;
