import { Route, Routes } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import PilotLogin from "./Pages/PilotLogin"
import UserLogin from "./Pages/UserLogin"
import UserSignup from "./Pages/UserSignup"
import PilotSignup from "./Pages/PilotSignup"
import UserHome from "./Pages/UserHome"
import UserProtectedWrapper from "./Pages/UserProtectedWrapper"
import UserLogout from "./Pages/UserLogout"
import PilotProtectedWrapper from "./Pages/PilotProtectedRoute"
import PilotHome from "./Pages/PilotHome"
import PilotLogout from "./Pages/PilotLogout"

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/pilotLogin" element={<PilotLogin />} />
        <Route path="/pilotSignup" element={<PilotSignup />} />

        <Route path='/userhome' element={<UserProtectedWrapper><UserHome /></UserProtectedWrapper>} />
        <Route path='/userLogout' element={<UserProtectedWrapper><UserLogout /></UserProtectedWrapper>} />

        <Route path="/pilothome" element={<PilotProtectedWrapper><PilotHome /></PilotProtectedWrapper>} />
        <Route path="/pilotLogout" element={<PilotProtectedWrapper><PilotLogout /></PilotProtectedWrapper>} />



      </Routes>
    </div>
  )
}

export default App
