import { Route, Routes } from "react-router";
import Home from "./routes/home.jsx";
import Gallery from "./routes/gallery.jsx";
import Register from "./routes/register.jsx";
import AdminDashboard from "./routes/admin.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
    );
}