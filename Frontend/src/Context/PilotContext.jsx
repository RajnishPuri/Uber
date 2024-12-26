import { createContext } from 'react'
import { useState } from 'react'

export const PilotDataContext = createContext();

const PilotContext = ({ children }) => {

    const [pilot, setPilot] = useState({
        user: {
            fullName: {
                firstName: "",
                lastName: ""
            },
            email: "",
            password: "",
            vehicleColor: "",
            vehicleNumber: "",
            vehicleType: "",
            vehicleCapacity: ""


        }
    })

    return (
        <div>
            <PilotDataContext.Provider value={{ pilot, setPilot }}>
                {children}
            </PilotDataContext.Provider>
        </div>
    )
}

export default PilotContext