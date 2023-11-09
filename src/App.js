import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";

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
    // const navigate = useNavigate();
    const [tattoos, setTattoos] = useState([]);
    const [image, setImage] = useState('');
    const baseUrl = 'http://localhost:5000/data/tattoos';

    useEffect(() => {
        fetch(baseUrl)
            .then(res => res.json())
            .then(data => setTattoos(data));
    }, [image]);

    const onSubmitUploadHandler = async (formData) => {
        try {
            const response = await fetch('http://localhost:5000/data/upload', {
                method: 'POST',
                body: formData
            });
            const tattoo = await response.json();

            setTattoos(state => [...state, tattoo]);
        } catch(e) {
            return {};
        }
        // navigate('/gallery');
    }

    return (
        <>
            <Header />
            <main className='pages'>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/gallery' element={<GalleryPage  tattoos={tattoos} setTattoos={setTattoos}/>} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/booking' element={<BookingPage />} />
                    <Route path='/upload' element={<UploadPage onSubmitUploadHandler={onSubmitUploadHandler} image={image} setImage={setImage}/>} />
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
