import React, { ReactNode } from "react";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import { Query } from "../model/Query";

interface OutputProps {
    query: Query;
}

const LoadingState: React.FC = () => (
    <div data-aos="fade-in" className="flex items-center space-x-3 text-blue-600">
        <FaSpinner className="animate-spin h-5 w-5 text-blue-600" />
        <span>Résolution en cours...</span>
    </div>
);

const SuccessState: React.FC<{ optimalValue: number; solution: number[] }> = ({ optimalValue, solution }) => (
    <div data-aos="fade-in">
        <div className="flex items-center space-x-3 mb-4 text-green-600">
            <FaCheckCircle className="h-4 w-4" />
            <span>Résolution terminée !</span>
        </div>
        <div className="mb-4 ml-[30px]">
            La valeur optimale est : <strong>{optimalValue}</strong>
        </div>
        <div className="hidden">
            L'affectation optimale est :
            <ol className="list-decimal list-inside mt-2 space-y-1">
                {solution.map((value, i) => (
                    <li key={i} className="text-gray-800">
                        {value + 1}
                    </li>
                ))}
            </ol>
        </div>
    </div>
);

const OutputContainer = ({
    children
}:{
    children: ReactNode;
}) => {
    return (
        <div className="p-6 rounded-lg max-w-lg">
            { children }
        </div>
    );
}

export const Output: React.FC<OutputProps> = ({ query }) => {
    return (
        <OutputContainer>
            {(query.isLoading || (query.isSuccess && query.data?.job.status !== "COMPLETED")) && (
                <LoadingState />
            )}
            {query.isSuccess && query.data?.job.status === "COMPLETED" && query.data?.job.result && (
                <SuccessState
                    optimalValue={query.data.job.result.optimalValue}
                    solution={query.data.job.result.solution}
                />
            )}
        </OutputContainer>
    );
};