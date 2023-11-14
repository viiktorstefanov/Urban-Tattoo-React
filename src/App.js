import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import { get, post } from './service/request';


function App() {
    const navigate = useNavigate();
    const [tattoos, setTattoos] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        try {
            get('/data/tattoos')
                .then(res => setTattoos(res));

            } catch (error) {
            console.log(error);
            }
    }, []);

    const onSubmitUploadHandler = async (formData) => {
        try {
            const response = await post('/data/upload', formData);
            
                setTattoos(state => [...state, response]);
                navigate('/gallery');
            
        } catch (err) {
            console.log(err);;
        }
    };

    return (
        <>
            <AuthProvider>
                <Header />
                <main className='pages'>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/gallery' element={<GalleryPage tattoos={tattoos} setTattoos={setTattoos} />} />
                        <Route path='/upload' element={<UploadPage onSubmitUploadHandler={onSubmitUploadHandler} image={image} setImage={setImage} />} />
                        <Route path='/register' element={<RegisterPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/logout' element={<LogoutPage />} />
                        <Route path='/booking' element={<BookingPage />} />
                        <Route path='/contact' element={<ContactPage />} />
                        <Route path='/users/:id' element={<ProfilePage />} />
                        <Route path='/users/edit/:id' element={<EditProfilePage />} />
                        <Route path='*' element={<DefaultPage />} />
                    </Routes>
                </main>
                <Footer />
            </AuthProvider>
        </>
    );
}

export default App;
