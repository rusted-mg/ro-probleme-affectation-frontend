import { Link } from "react-router-dom";
import { GiBrain } from "react-icons/gi";

const LandingPage: React.FC = () => {
    
    return (
        <div className="container" data-aos="fade-in">
            <div className="content">
                <h1 data-aos="fade-down"  className="heading font-bold">Optimisation d'Affectation</h1>
                <p data-aos="fade-in" data-aos-delay="500" className="text">
                    Bienvenue dans notre application dédiée à l'optimisation des problèmes
                    d'affectation. Simplifiez vos processus et trouvez les solutions les
                    plus efficaces grâce à notre outil.
                </p>
                <div className="buttonGroup">
                    <Link to="/workspace" className="home-link">
                        <button 
                        data-aos="fade-up" 
                        className="
                            landing-page-button
                            bg-blue-600
                            hover:bg-blue-700
                            cursor-pointer
                            text-white 
                            rounded-md 
                            flex 
                            items-center 
                            text-lg py-3 
                            px-6">
                            <GiBrain className="inline-block mr-2 text-xl" />
                            Commencer
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;