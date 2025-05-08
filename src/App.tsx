import { useEffect } from 'react';
import './App.css'
import LandingPage from './pages/LandingPage.tsx';
import Workspace from './pages/Workspace.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Aos from 'aos';
import "aos/dist/aos.css";

const App: React.FC = () => {
    useEffect(() => {
        Aos.init({
        duration: 600,
        easing: 'ease-in',
        offset: 0, 
        once: true
        });
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/workspace" element={<Workspace />} />
            </Routes>
        </Router>
    );
}

export default App;