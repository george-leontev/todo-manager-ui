import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.orange.light.css';
import './app.scss';

import { loadMessages, locale } from 'devextreme/localization';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main-page/main-page';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';
import { AuthContextProvider } from './contexts/auth-сontext';


function App() {

  loadMessages({
    'en': {
      'httpErrorMessage': 'An unexpected error occurred while executing the request: {0}'
    }
  });
  locale('en-En');

  return (
    <div className='app'>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/todos' element={<MainPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
