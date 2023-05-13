import AppRouter from "./components/AppRouter.tsx";
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
const App = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
    );
};

export default App;