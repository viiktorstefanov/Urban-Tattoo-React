import './App.css';
import { AuthProvider } from './contexts/AuthContext';

import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RoutesWrapper from './routes/RoutesWrapper';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary >
            <AuthProvider>
                <Header />
                <ToastContainer
                    position="top-left"
                    autoClose={0}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <main className='pages'>
                    <RoutesWrapper />
                </main>
            </AuthProvider>
            <Footer />
        </ErrorBoundary>
    );
}

export default App;
