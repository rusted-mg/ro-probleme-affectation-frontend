import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Legends = ({ 
    solutionShowed 
}:{ 
    solutionShowed:false | { optimalValue: number; solution: number[]; } | undefined 
}) => {
    return (
        <div>
            <div className="flex items-center gap-2 mb-1">
                <div className="rounded-4xl bg-blue-500 p-2"></div>
                <p className="text-sm">Postes</p>
            </div>
            <div className="flex items-center gap-2 mb-1">
                <div className="rounded-4xl bg-purple-400 p-2"></div>
                <p className="text-sm">Candidats</p>
            </div>
            {
                solutionShowed && (
                    <div className="flex items-center gap-2">
                        <div className="rounded-4xl bg-blue-200 p-2"></div>
                        <p className="text-sm">Solutions</p>
                    </div>
                )
            }
        </div>
    )
};

export const Indications = ({
    matrix,
    solutionShowed,
}: {
    matrix: (number | null)[][];
    solutionShowed: false | { optimalValue: number; solution: number[]; } | undefined;
}) => {
    const [indicationsRemoved, setIndicationsRemoved] = useState(false);

    return !indicationsRemoved && (
        <div
            data-aos="fade-in"
            className="relative bg-white border-3 border-gray-100 p-4 rounded-md z-10 min-w-[250px]"
        >
            <button
                onClick={()=>setIndicationsRemoved(true)}
                className="float-right text-gray-400 hover:text-gray-600 no-padding"
                aria-label="Remove"
            >
                <FaTimes />
            </button>
            {matrix.length > 0 ? (
                <>
                    <p className="mb-2 font-bold">Remplissez le tableau</p>
                    <Legends solutionShowed={solutionShowed}/>
                </>
            ) : (
                <p className="mb-2 font-bold">Commencez par entrer le nombre de postes</p>
            )}
        </div>
    );
};