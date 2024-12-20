import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import PilotLogin from "./Pages/PilotLogin"
import UserLogin from "./Pages/UserLogin"
import UserSignup from "./Pages/UserSignup"
import PilotSignup from "./Pages/PilotSignup"
const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/pilotLogin" element={<PilotLogin />} />
        <Route path="/pilotSignup" element={<PilotSignup />} />
      </Routes>
    </div>
  )
}

export default App
