import { Route, Routes } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import PilotLogin from "./Pages/PilotLogin"
import UserLogin from "./Pages/UserLogin"
import UserSignup from "./Pages/UserSignup"
import PilotSignup from "./Pages/PilotSignup"
import Home from "./Pages/Home"

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/pilotLogin" element={<PilotLogin />} />
        <Route path="/pilotSignup" element={<PilotSignup />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
