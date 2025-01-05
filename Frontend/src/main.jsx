import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './Context/UserContext.jsx';
import PilotContext from './Context/PilotContext.jsx';
import { SocketProvider } from './Context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PilotContext>
      <UserContext>
        <SocketProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SocketProvider>
      </UserContext>
    </PilotContext>
  </StrictMode>
);
