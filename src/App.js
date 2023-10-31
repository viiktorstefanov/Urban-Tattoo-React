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

function App() {
    return (
        <>
            <Header />
            <main>
                <HomePage />
                <RegisterPage />
                <LoginPage />
                <DefaultPage />
                <BookingPage />
                <UploadPage />
                <ContactPage />
            </main>
            <Footer />
        </>
    );
}

export default App;
