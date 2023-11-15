import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import ProfilePage from './components/ProfilePage/ProfilePage';
import HomePage from "./components/HomePage/HomePage";
import GalleryPage from './components/GalleryPage/GalleryPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import LogoutPage from './components/LogoutPage/LogoutPage';
import BookingPage from './components/BookingPage/BookingPage';
import UploadPage from './components/UploadPage/UploadPage';
import ContactPage from './components/ContactPage/ContactPage';
import EditProfilePage from './components/EditProfilePage/EditProfilePage';
import DefaultPage from './components/DefaultPage/DefaultPage';
import { TattoosProvider } from './contexts/TattooContext';


function App() {
    return (
        <>
            <AuthProvider>
                <Header />
                <main className='pages'>
                    <TattoosProvider>
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/gallery' element={<GalleryPage />} />
                            <Route path='/upload' element={<UploadPage />} />
                            <Route path='/register' element={<RegisterPage />} />
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='/logout' element={<LogoutPage />} />
                            <Route path='/booking' element={<BookingPage />} />
                            <Route path='/contact' element={<ContactPage />} />
                            <Route path='/profile/:id' element={<ProfilePage />} />
                            <Route path='/profile/edit/:id' element={<EditProfilePage />} />
                            <Route path='*' element={<DefaultPage />} />
                        </Routes>
                    </TattoosProvider>
                </main>
                <Footer />
            </AuthProvider>
        </>
    );
}

export default App;
