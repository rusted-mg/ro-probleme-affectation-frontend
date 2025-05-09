import {ChangeEvent, useState} from "react";
import {MatrixInput} from "./MatrixInput.tsx";
import {Sidebar} from "./Sidebar.tsx";

export interface InputFormSubmitEvent {
    matrix: number[][],
    optimization: string
}

interface InputFormProps {
    onSubmit: (event: InputFormSubmitEvent) => void;
    setJobId: (jobId: string) => void;
    query: {
        isLoading: boolean;
        isSuccess: boolean;
        data?: {
            job: {
                status: string;
                result?: {
                    optimalValue: number;
                    solution: number[];
                };
            };
        };
    };
}

export const InputForm = (props: InputFormProps) => {
    const [matrixSize, setMatrixSize] = useState(2);
    const [matrix, setMatrix] = useState<(number | null)[][]>([[null, null], [null, null]]);
    const [optimization, setOptimization] = useState<string>("MIN");

    const handleMatrixSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newSize = Number(e.target.value);
        const oldSize = matrixSize;
        setMatrixSize(newSize);
        setMatrix((prevState) => Array(newSize).fill(null)
            .map((_, r) => Array(newSize).fill(null)
                .map((_, c) => (r < oldSize && c < oldSize) ? prevState[r][c] : null)
            )
        );
    };

    const handleMatrixChange = (row: number, col: number, newValue: string) => {
        const value = isNaN(parseInt(newValue)) ? 0 : parseInt(newValue);

        if (value !== null && value !== undefined && value !== matrix[row][col]) {
            setMatrix(matrix.map((_, r) => Array(matrixSize).fill(null)
                .map((_, c) => (r === row && c === col) ? value : matrix[r][c])
            ));
        }
    };

    const handleSubmit = () => {
        const matrixInput = matrix.map((row) => row.map((val) => val || 0));
        props.onSubmit({ matrix: matrixInput, optimization: optimization });
    };

    const handleReset = () => {
        setMatrixSize(2);
        setMatrix([[null, null], [null, null]]);
        setOptimization("MIN");
        props.setJobId("");
    };

    const handleExportToPdf = () => {
        //
    };

    return (
        <>
            <MatrixInput query={props.query} matrix={matrix} onMatrixChange={handleMatrixChange} />
            <Sidebar 
                query={props.query}
                matrixSize={matrixSize} 
                optimization={optimization} 
                setOptimization={setOptimization} 
                handleMatrixSizeChange={handleMatrixSizeChange} 
                handleSubmit={handleSubmit} 
                handleReset={handleReset} 
                handleExportToPdf={handleExportToPdf} 
            />
        </>
    );
};