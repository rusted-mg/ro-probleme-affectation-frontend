import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const CurvedArrow = ({
    width = 65,
    height = 20,
    curvature = 0.7,
}: {
    width?: number;
    height?: number;
    curvature?: number;
}) => {
    const startX = 8;
    const startY = 15;
    const endX = width;
    const endY = 20;
    const controlX = width * curvature;
    const controlY = height * (1 - curvature);
    // const color = "#3b82f6";
    const color = "#fb64b6";

    return (
        <svg
            width={width}
            height={height}
            style={{ display: "block" }}
            viewBox={`0 0 ${width} ${height}`}
        >
            <path
                d={`M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`}
                fill="none"
                stroke={color}
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
            />
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="5"
                    markerHeight="5"
                    refX="3"
                    refY="2.5"
                    orient="auto"
                >
                    <polygon points="0 0, 5 2.5, 0 6" fill={color} />
                </marker>
            </defs>
        </svg>
    );
};

const Legends = ({ 
    solutionShowed 
}:{ 
    solutionShowed:false | { optimalValue: number; solution: number[]; } | undefined 
}) => {
    return (
        <div className="text-gray-500">
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
    const indicationsClassName = `relative bg-white border-3 border-gray-100 p-4 rounded-md z-10 min-w-[250px] ${indicationsRemoved ? 'opacity-0 pointer-events-none select-none invisible' : 'opacity-1'}`

    return (
        <div
            data-aos="fade-in"
            className={indicationsClassName}
        >
            {matrix.length > 0 && (
                <div className="absolute top-0 left-62 pointer-events-none">
                    <CurvedArrow/>
                </div>
            )}
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
                <p className="mb-2 font-bold">Commencez par entrer le nombre de postes...</p>
            )}
        </div>
    );
};