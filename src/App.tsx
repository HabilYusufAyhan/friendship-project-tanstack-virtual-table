import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './features/auth/routes/LoginPage';
import SignupPage from './features/auth/routes/SignupPage';
import HomePage from './features/home/routes/HomePage';
import User from './features/users/routers/User';
import RootLayout from './shared/layouts/RootLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
