import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
    return (
        <div className="container">
            <div className="content">
                <h1 className="heading">Optimisation de Problème d'Affectation</h1>
                <p className="text">
                    Bienvenue dans notre application dédiée à l'optimisation des problèmes
                    d'affectation. Simplifiez vos processus et trouvez les solutions les
                    plus efficaces grâce à nos outils avancés.
                </p>
                <div className="buttonGroup">
                    <Link to="/workspace" className="home-link">
                        <button className="bg-blue-200">Commencer</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;