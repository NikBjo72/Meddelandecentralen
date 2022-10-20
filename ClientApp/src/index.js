import { createRoot } from 'react-dom/client';
import App from './app';

const container = document.getElementById("root"); // app = <div> med app som Id
const root = createRoot(container); // skapar root med container

root.render(<App />);