import { ChangeEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { solverService } from "../service/SolverService.ts";
import { Output } from "../components/Output.tsx";
import { ZoomControls } from "../components/ZoomControls.tsx";
import { Sidebar } from "../components/Sidebar.tsx";
import { MatrixInput } from "../components/MatrixInput.tsx";
import { generatePdf } from "../utils/pdf-generator.ts";

const Workspace: React.FC = () => {
    const [jobId, setJobId] = useState<string>();
    const query = useQuery({
        queryKey: ["solverJob", jobId],
        queryFn: () => solverService.getJob(jobId as string),
        enabled: !!jobId,
        refetchInterval: (query) => query.state.data?.job.status == "IN_PROGRESS" ? 2000 : false,
    });
    
    const [matrixSize, setMatrixSize] = useState(2);
    const [matrix, setMatrix] = useState<(number | null)[][]>([[null, null], [null, null]]);
    const [optimization, setOptimization] = useState<string>("MIN");

    const [zoom, setZoom] = useState(100);

    const handleMatrixChange = (row: number, col: number, newValue: string) => {
        const value = isNaN(parseInt(newValue)) ? 0 : parseInt(newValue);

        if (value !== null && value !== undefined && value !== matrix[row][col]) {
            setMatrix(matrix.map((_, r) => Array(matrixSize).fill(null)
                .map((_, c) => (r === row && c === col) ? value : matrix[r][c])
            ));
        }
    };

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

    const handleSubmit = async () => {
        const matrixInput = matrix.map((row) => row.map((val) => val || 0));
        const uuid = await solverService.launchJob(matrixInput, optimization === "MAX" ? optimization : "MIN");
        setJobId(uuid);
        window.scrollTo({ top:0, left: document.body.scrollWidth, behavior: "smooth" });
    };

    const handleReset = () => {
        setMatrixSize(2);
        setMatrix([[null, null], [null, null]]);
        setOptimization("MIN");
        setJobId("");
    };

    const handleExportToPdf = async () => {
        if (query.data?.job.result) {
            generatePdf(optimization, query.data?.job.result?.optimalValue, query.data?.job.result?.solution || []);
        }
    };

    return (
        <div className="workspace-container min-h-screen">
            <div data-aos="fade-down" className="fixed top-5 left-10 flex items-center justify-center gap-2 bg-white p-4 shadow-sm rounded-lg z-10">
                <Link to="/" className="home-link text-lg">←</Link>
                <div className="flex justify-center items-center border-l border-gray-200 px-2 gap-2">
                    <img src="/src/assets/logo-outline-xl.png" alt="Logo" className="w-[30px]"/>
                    <p className="font-bold">Espace de travail</p>
                </div>
            </div>
            <div className="workspace-main" style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top left" }}>
                <div className="flex items-baseline justify-center gap-10">
                    <MatrixInput query={query} matrix={matrix} onMatrixChange={handleMatrixChange} />
                    <Output query={query}/>
                </div>
            </div>
            <ZoomControls
                zoom={zoom}
                setZoom={setZoom}
            />
            <Sidebar 
                query={query}
                matrixSize={matrixSize} 
                optimization={optimization} 
                setOptimization={setOptimization} 
                handleMatrixSizeChange={handleMatrixSizeChange} 
                handleSubmit={handleSubmit} 
                handleReset={handleReset} 
                handleExportToPdf={handleExportToPdf} 
            />
        </div>
    );
}

export default Workspace;