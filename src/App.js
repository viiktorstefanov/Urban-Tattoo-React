import './App.css';
import { AuthProvider } from './contexts/AuthContext';

import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';

import { TattoosProvider } from './contexts/TattooContext';
import RoutesWrapper from './routes/RoutesWrapper';

function App() {
    return (
        <>
            <AuthProvider>
                <Header />
                <main className='pages'>
                    <TattoosProvider>
                        <RoutesWrapper />
                    </TattoosProvider>
                </main>
            </AuthProvider>
            <Footer />
        </>
    );
}

export default App;
