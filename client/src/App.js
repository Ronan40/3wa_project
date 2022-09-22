import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import List from "./pages/list/List.jsx";
import Hotel from "./pages/hotel/Hotel.jsx";
import Login from "./pages/login/Login.jsx";
import CreateHotel from "./pages/createHotel/CreateHotel.jsx";
import Register from "./pages/register/Register.jsx";
import "./app.css";
import HandleHotel from "./pages/handleHotel/HandleHotel.jsx";
import UpdateHotel from "./pages/updateHotel/UpdateHotel.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/create-hotel" element={<CreateHotel />} />
        <Route path="/handle-hotel" element={<HandleHotel />} />
        <Route path="/update-hotel/:id" element={<UpdateHotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
