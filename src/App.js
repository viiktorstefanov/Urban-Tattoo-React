import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import ProfilePage from './components/ProfilePage/ProfilePage';
import HomePage from "./components/HomePage/HomePage";
import GalleryPage from './components/GalleryPage/GalleryPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import BookingPage from './components/BookingPage/BookingPage';
import UploadPage from './components/UploadPage/UploadPage';
import ContactPage from './components/ContactPage/ContactPage';
import EditProfilePage from './components/EditProfilePage/EditProfilePage';
import DefaultPage from './components/DefaultPage/DefaultPage';

function App() {
    return (
        <>
            <Header />
            <main className='pages'>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/gallery' element={<GalleryPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/booking' element={<BookingPage />} />
                    <Route path='/upload' element={<UploadPage />} />
                    <Route path='/contact' element={<ContactPage />} />
                    <Route path='/users/:id' element={<ProfilePage />} />
                    <Route path='/users/edit/:id' element={<EditProfilePage />} />
                    <Route path='*' element={<DefaultPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
