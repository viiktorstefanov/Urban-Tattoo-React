import './styles/App.css';
import Header from "./components/Header";
import Footer from './components/Footer';
import HomePage from "./components/main/HomePage";
import RegisterPage from './components/main/RegisterPage';
import LoginPage from './components/main/LoginPage';
import DefaultPage from './components/main/DefaultPage';
import BookingPage from './components/main/BookingPage';
import UploadPage from './components/main/UploadPage';
import ContactPage from './components/main/ContactPage';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/booking' element={<BookingPage />} />
                    <Route path='/upload' element={<UploadPage />} />
                    <Route path='/contact' element={<ContactPage />} />
                    <Route path='*' element={<DefaultPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
