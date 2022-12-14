import { createRoot } from 'react-dom/client';
import App from './app';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { UserContextProvider } from './Components/Contexts/user-context';
import { HashRouter } from "react-router-dom";

const container = document.getElementById("root"); // app = <div> med app som Id
const root = createRoot(container); // skapar root med container

root.render(
    <HashRouter>
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </HashRouter>
);