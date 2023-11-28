import './App.css';
import { AuthProvider } from './contexts/AuthContext';

import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';

import RoutesWrapper from './routes/RoutesWrapper';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary >
            <AuthProvider>
                <Header />
                <main className='pages'>
                    <RoutesWrapper />
                </main>
            </AuthProvider>
            <Footer />
        </ErrorBoundary>
    );
}

export default App;
