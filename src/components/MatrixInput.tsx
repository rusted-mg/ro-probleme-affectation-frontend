interface MatrixInputProps {
    matrix: (number | null)[][];
    onMatrixChange: (row: number, col: number, newValue: string) => void;
}

export const MatrixInput = ({matrix, onMatrixChange}: MatrixInputProps) => {
    return (
        <table border={1} style={{borderCollapse: "collapse"}}>
            <tbody>
            {matrix.map((row, r) => (
                <tr key={r}>
                    {row.map((val, c) => (
                        <td key={c}>
                            <input type="number"
                                   value={val || ""}
                                   style={{maxWidth: "50px", border: "none"}}
                                   required={true}
                                   min={0}
                                   onChange={e => onMatrixChange(r, c, e.target.value)}/>
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};