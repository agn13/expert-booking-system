import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/temp";

import ExpertsList from "./pages/ExpertsList";
import ExpertDetail from "./pages/ExpertDetail";
import MyBookings from "./pages/MyBookings";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<ExpertsList />} />

        <Route path="/expert/:id" element={<ExpertDetail />} />

        <Route path="/my-bookings" element={<MyBookings />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;