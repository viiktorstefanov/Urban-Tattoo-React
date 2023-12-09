import { Route, Routes } from "react-router-dom";

import Profile from '../components/Profile/Profile';
import Home from "../components/Home/Home";
import Gallery from '../components/Gallery/Gallery';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Logout from '../components/Logout/Logout';
import Booking from '../components/Booking/Booking';
import Upload from '../components/Upload/Upload';
import Contact from '../components/Contact/Contact';
import EditProfile from '../components/EditProfile/EditProfile';
import Default from '../components/Default/Default';
import Comments from "../components/Comments/Comments";
import { TattoosProvider } from '../contexts/TattooContext';

import AuthGuard from "../components/Guards/AuthGuard";
import AdminGuard from "../components/Guards/AdminGuard";

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