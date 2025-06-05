import { ReactNode } from "react";
import { Query } from "../model/Query";
import { Indications } from "./Indications";

interface MatrixInputProps {
    matrix: (number | null)[][];
    onMatrixChange: (row: number, col: number, newValue: string) => void;
    query: Query;
}

const TableHeader = ({ matrix }: { matrix: (number | null)[][] }) => {
    return (
        <thead>
            <tr>
                <th></th>
                {matrix[0] &&
                    matrix[0].map((_, c) => (
                        <th
                            key={c}
                            className="border-2 border-blue-500 bg-blue-500 text-center px-2 py-1 font-medium text-white"
                        >
                            {c + 1}
                        </th>
                    ))
                }
            </tr>
        </thead>
    );
};

const TableCell = ({
    value,
    name,
    isSolution,
    onChange,
}: {
    value: number | null;
    name: string;
    isSolution: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const cellClassName = `border ${isSolution && "bg-blue-200"}`;
    const inputClassName = `w-12 border-none text-center placeholder:text-gray-500 focus:placeholder:text-white ${
        isSolution && "solution-input"
    }`;

    return (
        <td className={cellClassName}>
            <input
                type="number"
                value={value || ""}
                name={name}
                className={inputClassName}
                placeholder="0"
                required={true}
                onChange={onChange}
            />
        </td>
    );
};

const TableBody = ({
    matrix,
    solution,
    onMatrixChange,
}: {
    matrix: (number | null)[][];
    solution: number[] | undefined;
    onMatrixChange: (row: number, col: number, newValue: string) => void;
}) => {
    return (
        <tbody>
            {matrix.map((row, r) => (
                <tr key={r}>
                    <td className="border-2 p-3 border-purple-400 bg-purple-400 text-center font-medium text-white">
                        {r + 1}
                    </td>
                    {row.map((val, c) => (
                        <TableCell
                            key={c}
                            value={val}
                            name={`tablecell-${r}`}
                            isSolution={!!solution && solution[r] === c}
                            onChange={(e) => onMatrixChange(r, c, e.target.value)}
                        />
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

const MatrixTable = ({
    matrix,
    solution,
    onMatrixChange,
}: {
    matrix: (number | null)[][];
    solution: number[] | undefined;
    onMatrixChange: (row: number, col: number, newValue: string) => void;
}) => {
    return (
        <div data-aos="fade-in" className="overflow-auto">
            <table id="matrix-table" className="bg-white">
                <TableHeader matrix={matrix} />
                <TableBody matrix={matrix} solution={solution} onMatrixChange={onMatrixChange} />
            </table>
        </div>
    );
};

const MatrixInputContainer = ({
    children
}:{
    children: ReactNode;
}) => {
    return (
        <div>
            <div className="flex items-baseline justify-center gap-16">
                { children }
            </div>
        </div>
    );
}

export const MatrixInput = ({ matrix, query, onMatrixChange }: MatrixInputProps) => {
    const solutionShowed =
        query.isSuccess &&
        query.data?.job.status === "COMPLETED" &&
        query.data?.job.result;
    const solution = query.data?.job.result?.solution;
    return (
        <MatrixInputContainer>
            <Indications solutionShowed={solutionShowed} matrix={matrix} />
            <MatrixTable solution={solution} matrix={matrix} onMatrixChange={onMatrixChange} />
        </MatrixInputContainer>
    );
};