import {ChangeEvent, useState} from "react";
import {MatrixInput} from "./MatrixInput.tsx";

export interface InputFormSubmitEvent {
    matrix: number[][],
    optimization: string
}

interface InputFormProps {
    onSubmit: (event: InputFormSubmitEvent) => void;
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
        )
    };

    const handleMatrixChange = (row: number, col: number, newValue: string) => {
        const value = parseInt(newValue);
        if (value && value != matrix[row][col]) {
            setMatrix(matrix.map((_, r) => Array(matrixSize).fill(null)
                .map((_, c) => (r === row && c === col) ? value : matrix[r][c])
            ));
        }
    };

    const handleSubmit = () => {
        const matrixInput = matrix.map((row) => row.map((val) => val || 0));
        props.onSubmit({matrix: matrixInput, optimization: optimization})
    }

    return (
        <>
            <label>
                Dimension de la matrice :
                <input type="number" value={matrixSize} min={2} max={10}
                       onChange={handleMatrixSizeChange}/>
            </label>
            <br/>
            <label>
                Type d'optimisation d'affectation :
                <select value={optimization} onChange={e => setOptimization(e.target.value)}>
                    <option value="MIN" defaultChecked={true}>Minimisation</option>
                    <option value="MAX">Maximisation</option>
                </select>
            </label>
            <br/>
            <div className="matrix-container">
                <MatrixInput matrix={matrix} onMatrixChange={handleMatrixChange}/>
            </div>
            <button onClick={handleSubmit}>Résoudre</button>
        </>
    )
};