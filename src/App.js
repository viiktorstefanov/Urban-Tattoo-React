import './App.css';
import { AuthProvider } from './contexts/AuthContext';

import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';

import RoutesWrapper from './routes/RoutesWrapper';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Problem from './components/ErrorBoundary/Problem';

function App() {
    return (
        <ErrorBoundary FallbackComponent={<Problem />} >
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
