import { Link } from "react-router-dom";
import { GiBrain } from "react-icons/gi";
import { useEffect } from "react";

const LinkToWorkspace = () => {
    return (
        <div className="buttonGroup">
            <Link to="/workspace" className="home-link">
                <button 
                data-aos="fade-up" 
                className="
                    landing-page-button
                    cursor-pointer
                    text-white 
                    rounded-md 
                    flex 
                    items-center
                    bg-blue-600
                    text-lg
                    hover:bg-blue-700">
                    <GiBrain className="inline-block mr-2 text-xl" />
                    Commencer
                </button>
            </Link>
        </div>
    );
}

const LandingPageContent = () => {
    return (
        <div className="landing-page-content">
            <div className="flex justify-center mb-8" data-aos="fade-in" data-aos-delay="800">
                <img className="w-[60px]" src="/src/assets/logo-outline-xl.png" alt="Logo" />
            </div>
            <h1 data-aos="fade-down"  className="heading styled-text font-bold">Optimisation d'affectation</h1>
            <p data-aos="fade-in" data-aos-delay="500" className="text">
                Bienvenue dans notre application dédiée à l'optimisation des problèmes
                d'affectation. Simplifiez vos processus et trouvez les solutions les
                plus efficaces grâce à notre outil.
            </p>
            <LinkToWorkspace/>
        </div>
    );   
}

const LandingPageBackground = () => {  
    return (
        <div className="synthwave-container">
            <div className="synthwave-grid"></div>
            <div className="synthwave-laser-container">
                <div className="synthwave-laser"></div>
                <div className="synthwave-laser"></div>
                <div className="synthwave-laser"></div>
                <div className="synthwave-laser"></div>
            </div>
        </div>
    );   
}

const LandingPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo({ top:0, left: 0});
    }, []);
    
    return (
        <div className="landing-page-container" data-aos="fade-in">
            <LandingPageContent/>
            <LandingPageBackground/>
        </div>
    );
};

export default LandingPage;