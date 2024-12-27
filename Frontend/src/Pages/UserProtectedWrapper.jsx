import { UserDataContext } from "../Context/UserContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const UserProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (!token || role !== "user") {
            navigate("/userLogin")
        }
    }, [token])

    const { user } = useContext(UserDataContext);

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectedWrapper