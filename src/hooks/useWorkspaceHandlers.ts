import { ChangeEvent } from "react";
import { solverService } from "../service/SolverService";
import { generatePdf } from "../utils/pdf-generator";
import { Query } from "../model/Query";

interface UseWorkspaceHandlersProps {
    matrix: (number | null)[][];
    setMatrix: (matrix: (number | null)[][]) => void;
    matrixSize: number;
    setMatrixSize: (matrixSize: number) => void;
    optimization: string;
    setOptimization: (optimization: string) => void;
    setJobId: (jobId: string | undefined) => void;
    query: Query
}

export const useWorkspaceHandlers = ({
    matrix,
    setMatrix,
    matrixSize,
    setMatrixSize,
    optimization,
    setOptimization,
    setJobId,
    query,
}: UseWorkspaceHandlersProps) => {
    const handleMatrixSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const oldSize = matrixSize;
        const newSize = Number(e.target.value);
        const newMatrix = Array(newSize)
            .fill(null)
            .map((_, r) =>
                Array(newSize)
                    .fill(null)
                    .map((_, c) => (r < oldSize && c < oldSize ? matrix[r][c] : null))
            );
        setMatrixSize(newSize);
        setMatrix(newMatrix);
    };

    const handleSubmit = async () => {
        const matrixInput = matrix.map((row) => row.map((val) => val || 0));
        const uuid = await solverService.launchJob(matrixInput, optimization === "MAX" ? optimization : "MIN");
        setJobId(uuid);
        window.scrollTo({ top: 0, left: document.body.scrollWidth, behavior: "smooth" });
    };

    const handleReset = () => {
        setMatrixSize(2);
        setMatrix([
            [null, null],
            [null, null],
        ]);
        setOptimization("MIN");
        setJobId("");
    };

    const handleExportToPdf = async () => {
        if (query.data?.job.result) {
            generatePdf(optimization, query.data.job.result.optimalValue, query.data.job.result.solution || []);
        }
    };

    return {
        handleMatrixSizeChange,
        handleSubmit,
        handleReset,
        handleExportToPdf,
    };
};