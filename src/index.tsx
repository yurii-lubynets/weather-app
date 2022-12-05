import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingScreen from 'src/components/LoadingScreen';
import { persistor, store } from 'src/redux/store';
import App from './App';
import { AuthProvider } from './contexts/JWTContext';
import { SettingsProvider } from './contexts/SettingsContext';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <SettingsProvider>
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        </SettingsProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
