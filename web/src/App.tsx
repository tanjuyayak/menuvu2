import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MenuScreen } from './menu/MenuScreen/MenuScreen';
import { HomeScreen } from './website/screens/Home/HomeScreen';
import { AuthPage } from './partner-portal/screens/Auth/AuthPage';
import { config } from './config';
import './App.css';

function App() {
  const appContent = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/menu" element={<MenuScreen />} />
        <Route path="/partner/login" element={<AuthPage />} />
        <Route path="/partner" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );

  // Always provide GoogleOAuthProvider, but use placeholder if clientId is not set
  // This prevents hook errors while allowing the app to work without Google auth configured
  const clientId = config.googleClientId || 'placeholder-client-id';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {appContent}
    </GoogleOAuthProvider>
  );
}

export default App;
