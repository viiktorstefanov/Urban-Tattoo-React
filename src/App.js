import './App.css';
import Header from "./components/Header";
import Footer from './components/Footer';
import HomePage from "./components/views/HomePage";
import RegisterPage from './components/views/RegisterPage';
import LoginPage from './components/views/LoginPage';
import DefaultPage from './components/views/DefaultPage';
import BookingPage from './components/views/BookingPage';
import UploadPage from './components/views/UploadPage';
import ContactPage from './components/views/ContactPage';
import { Routes, Route } from 'react-router-dom';
import GalleryPage from './components/views/GalleryPage';

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/gallery' element={<GalleryPage />} />
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
