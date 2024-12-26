import { UserDataContext } from "../Context/UserContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

const UserProtectedWrapper = ({ children }) => {
    const { user } = useContext(UserDataContext);
    const navigate = useNavigate();

    return (
        <div>UserProtectedWrapper</div>
    )
}

export default UserProtectedWrapper