import React from "react";

interface LandingPageProps {
    handleChangePage: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ handleChangePage }) => {
    return (
        <div style={styles.container as React.CSSProperties}>
            <div style={styles.content}>
                <h1 style={styles.heading}>Optimisation de Problème d'Affectation</h1>
                <p style={styles.text}>
                    Bienvenue dans notre application dédiée à l'optimisation des problèmes
                    d'affectation. Simplifiez vos processus et trouvez les solutions les
                    plus efficaces grâce à nos outils avancés.
                </p>
                <div style={styles.buttonGroup}>
                    <button onClick={()=>handleChangePage()}>Commencer</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        textAlign: "center",
    },
    content: {
        maxWidth: "1000px",
        padding: "20px",
    },
    heading: {
        fontSize: "3.3rem",
        marginBottom: "2.5rem",
    },
    text: {
        fontSize: "1.125rem",
        color: "#4a5568",
        marginBottom: "2.5rem",
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
    },
    button: {
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
    },
};

export default LandingPage;