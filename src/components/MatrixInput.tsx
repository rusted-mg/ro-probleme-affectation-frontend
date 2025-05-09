import { Indications } from "./Indications";

interface MatrixInputProps {
    matrix: (number | null)[][];
    onMatrixChange: (row: number, col: number, newValue: string) => void;
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
        <div
            data-aos="fade-in"
            className="overflow-auto"
        >
            <table className="bg-white">
                <thead>
                    <tr>
                        <th></th>
                        {matrix[0] && matrix[0].map((_, c) => (
                            <th key={c} className="border-2 border-blue-300 bg-blue-300 text-center px-2 py-1 font-medium text-white">
                                {c + 1}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row, r) => (
                        <tr key={r}>
                            <td className="border-2 p-3 border-blue-200 bg-blue-200 text-center font-medium text-white">{r + 1}</td>
                            {row.map((val, c) => {
                                const cellClassName = `border ${ solution && solution[r] === c && "bg-green-200" }`;
                                const inputClassName = `w-12 border-none text-center placeholder:text-gray-400 focus:placeholder:text-white ${ solution && solution[r] === c && "solution-input" }`;
                                
                                return (
                                    <td key={c} className={cellClassName}>
                                        <input
                                            type="number"
                                            value={val || ""}
                                            className={inputClassName}
                                            placeholder="0"
                                            required={true}
                                            onChange={(e) => onMatrixChange(r, c, e.target.value)}
                                        />
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export const MatrixInput = ({ matrix, query, onMatrixChange }: MatrixInputProps) => {
    return (
        <div>
            <div className="flex items-baseline justify-center gap-15">
                <Indications matrix={matrix} />
                <MatrixTable solution={query.data?.job.result?.solution} matrix={matrix} onMatrixChange={onMatrixChange} />
            </div>
        </div>
    );
};