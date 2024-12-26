import { createContext } from 'react'
import { useState } from 'react'

export const UserDataContext = createContext();

const UserContext = ({ children }) => {

    const [user, setUser] = useState({
        user: {
            fullName: {
                firstName: "",
                lastName: ""
            },
            email: "",
            password: "",

        }
    })

    return (
        <>
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </>
    )
}

export default UserContext