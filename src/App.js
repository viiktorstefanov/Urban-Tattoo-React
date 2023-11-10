import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
// import Test from './components/Test/Test'

function App() {
    const navigate = useNavigate();
    const [tattoos, setTattoos] = useState([]);
    const [image, setImage] = useState('');

    useEffect( () => {
        try {
            axios.get('http://localhost:5000/data/tattoos')
            .then(res => {
                if(res.status === 200) {
                     setTattoos(res.data);
                }else {
                    throw new Error('problem from server');
                }
            })

        } catch (error) {
            console.log(error);
        }
    }, []);

    const onSubmitUploadHandler = async (formData) => {
        try {
            const response = await axios.post('http://localhost:5000/data/upload', formData);
            if(response.status === 200) {
                setTattoos(state => [...state, response.data]);
                navigate('/gallery');
            } else {
                throw new Error('problem with server')
            }
        } catch(err) {
            console.log(err);;
        }    
    };

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
