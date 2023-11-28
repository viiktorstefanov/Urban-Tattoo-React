import { Route, Routes } from "react-router-dom";

import ProfilePage from '../components/ProfilePage/ProfilePage';
import HomePage from "../components/HomePage/HomePage";
import GalleryPage from '../components/GalleryPage/GalleryPage';
import RegisterPage from '../components/RegisterPage/RegisterPage';
import LoginPage from '../components/LoginPage/LoginPage';
import LogoutPage from '../components/LogoutPage/LogoutPage';
import BookingPage from '../components/BookingPage/BookingPage';
import UploadPage from '../components/UploadPage/UploadPage';
import ContactPage from '../components/ContactPage/ContactPage';
import EditProfilePage from '../components/EditProfilePage/EditProfilePage';
import DefaultPage from '../components/DefaultPage/DefaultPage';
import CommentsPage from "../components/CommentsPage/CommentsPage";
import { TattoosProvider } from '../contexts/TattooContext';

import AuthGuard from "../components/Guards/AuthGuard";
import AdminGuard from "../components/Guards/AdminGuard";

export default function RoutesWrapper() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/gallery' element={<TattoosProvider><GalleryPage /></TattoosProvider>}/>
            <Route path='/upload' element={<AdminGuard><TattoosProvider><UploadPage /></TattoosProvider></AdminGuard>}/>
            <Route element={<AuthGuard/>}>
                <Route path='/gallery/:id/comments' element={<CommentsPage />} />
                <Route path='/logout' element={<LogoutPage />} />
                <Route path='/profile/:id' element={<ProfilePage />} />
                <Route path='/profile/edit/:id' element={<EditProfilePage />} />
            </Route>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/booking' element={<BookingPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='*' element={<DefaultPage />} />
        </Routes>
    );
};