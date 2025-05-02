import './App.css'
import LandingPage from './pages/landingPage.tsx';
import Workspace from './pages/workspace.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
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