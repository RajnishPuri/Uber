import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { PilotDataContext } from "../Context/PilotContext"

const PilotProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log(role);
    useEffect(() => {
        if (!token || role !== "pilot") {
            navigate("/pilotLogin")
        }
    }, [token])

    const { pilot } = useContext(PilotDataContext);

    return (
        <>
            {children}
        </>
    )
}

export default PilotProtectedWrapper