import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MenuScreen } from './menu/MenuScreen/MenuScreen';
import { HomeScreen } from './website/screens/Home/HomeScreen';
import { AuthPage } from './partner-portal/screens/Auth/AuthPage';
import { config } from './config';
import './App.css';

function App() {
  return (
    <GoogleOAuthProvider clientId={config.googleClientId}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/menu" element={<MenuScreen />} />
          <Route path="/partner/login" element={<AuthPage />} />
          <Route path="/partner" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
