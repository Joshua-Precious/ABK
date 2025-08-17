import "./styles/tailwind.css";
import AppRoutes from "./routes.jsx";   
import { BrowserRouter} from "react-router";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
);
