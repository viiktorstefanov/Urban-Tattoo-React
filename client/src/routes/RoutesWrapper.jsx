import { Route, Routes } from "react-router-dom";

import Profile from '../components/Profile/Profile.jsx';
import Home from "../components/Home/Home.jsx";
import Gallery from '../components/Gallery/Gallery.jsx';
import Register from '../components/Register/Register.jsx';
import Login from '../components/Login/Login.jsx';
import Logout from '../components/Logout/Logout.jsx';
import Booking from '../components/Booking/Booking.jsx';
import Upload from '../components/Upload/Upload.jsx';
import Contact from '../components/Contact/Contact.jsx';
import EditProfile from '../components/EditProfile/EditProfile.jsx';
import Default from '../components/Default/Default.jsx';
import Comments from "../components/Comments/Comments.jsx";
import { TattoosProvider } from '../contexts/TattooContext.js';

import AuthGuard from "../components/Guards/AuthGuard.jsx";
import AdminGuard from "../components/Guards/AdminGuard.jsx";

export default function RoutesWrapper() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route
                path='/gallery'
                element={
                    <TattoosProvider>
                        <Gallery />
                    </TattoosProvider>
                }
            />
            <Route
                path='/upload'
                element={
                    <AdminGuard>
                        <TattoosProvider>
                            <Upload />
                        </TattoosProvider>
                    </AdminGuard>
                }
            />
            <Route element={<AuthGuard />}>
                <Route path='/gallery/:id/comments' element={<Comments />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/profile/:id' element={<Profile />} />
                <Route path='/profile/edit/:id' element={<EditProfile />} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/booking' element={<Booking />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<Default />} />
        </Routes>
    );
};