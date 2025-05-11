import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { solverService } from "../service/SolverService.ts";
import { Output } from "../components/Output.tsx";
import { ZoomControls } from "../components/ZoomControls.tsx";
import { Sidebar } from "../components/Sidebar.tsx";
import { MatrixInput } from "../components/MatrixInput.tsx";
import { generatePdf } from "../utils/pdf-generator.ts";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface WorkspaceProps {
    matrix: (number | null)[][];
    setMatrix: (matrix: (number | null)[][]) => void;
    matrixSize: number;
    setMatrixSize: (matrixSize: number) => void;
    zoom: (number);
    setZoom: (zoom: number) => void;
    optimization: (string);
    setOptimization: (optimization: string) => void;
    jobId: (string | undefined);
    setJobId: (jobId: string | undefined) => void;
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

type WorkspaceContentProps = Pick<WorkspaceProps, 'matrix' | 'setMatrix' | 'matrixSize' | 'query' | 'zoom'>;

type WorkspaceSidebarProps = Pick<WorkspaceProps, 'matrix' | 'setMatrix' | 'matrixSize' | 'setMatrixSize' | 'optimization' | 'setOptimization' | 'setJobId' | 'query'>;

const WorkspaceHeader = () => {
    return (
        <div data-aos="fade-down" className="fixed top-5 left-10 flex-center gap-2 bg-white p-4 shadow-sm rounded-lg z-10">
            <Link to="/" className="home-link text-lg">
                <AiOutlineArrowLeft className="mr-1" />
            </Link>
            <div className="flex justify-center items-center border-l border-gray-200 px-3 gap-2">
                <img src="/src/assets/logo-outline-xl.png" alt="Logo" className="w-[30px]"/>
                <p className="font-bold">Espace de travail</p>
            </div>
        </div>
    );
}

const WorkspaceContent: React.FC<WorkspaceContentProps> = ({ matrix, setMatrix, matrixSize, query, zoom }) => {
    const contentStyle = { transform: `scale(${zoom / 100})`, transformOrigin: "top left" };
    
    const handleMatrixChange = (row: number, col: number, newValue: string) => {
        const value = isNaN(parseInt(newValue)) ? 0 : parseInt(newValue);

        if (value !== null && value !== undefined && value !== matrix[row][col]) {
            setMatrix(matrix.map((_, r) => Array(matrixSize).fill(null)
                .map((_, c) => (r === row && c === col) ? value : matrix[r][c])
            ));
        }
    };

    return (
        <div className="workspace-content" style={contentStyle}>
            <div className="flex items-baseline justify-center gap-10">
                <MatrixInput query={query} matrix={matrix} onMatrixChange={handleMatrixChange} />
                <Output query={query}/>
            </div>
        </div>
    )
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
    matrix,
    setMatrix,
    matrixSize,
    setMatrixSize,
    optimization,
    setOptimization,
    setJobId,
    query
}) => {
    const handleMatrixSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const oldSize = matrixSize;
        const newSize = Number(e.target.value);
        const newMatrix = Array(newSize).fill(null)
            .map((_, r) => Array(newSize).fill(null)
            .map((_, c) => (r < oldSize && c < oldSize) ? matrix[r][c] : null)
        )
        setMatrixSize(newSize);
        setMatrix(newMatrix);
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
    )
}

const Workspace = () => {
    const [jobId, setJobId] = useState<string>();
    const [matrixSize, setMatrixSize] = useState(2);
    const [matrix, setMatrix] = useState<(number | null)[][]>([[null, null], [null, null]]);
    const [optimization, setOptimization] = useState<string>("MIN");
    const [zoom, setZoom] = useState<number>(100);
    const query = useQuery({
        queryKey: ["solverJob", jobId],
        queryFn: () => solverService.getJob(jobId as string),
        enabled: !!jobId,
        refetchInterval: (query) => query.state.data?.job.status == "IN_PROGRESS" ? 2000 : false,
    });

    return (
        <div className="workspace-container min-h-screen">
            <WorkspaceHeader/>
            <WorkspaceSidebar
                matrix={matrix}
                setMatrix={setMatrix}
                matrixSize={matrixSize}
                setMatrixSize={setMatrixSize}
                optimization={optimization}
                setOptimization={setOptimization}
                setJobId={setJobId}
                query={query}
            />
            <WorkspaceContent
                matrix={matrix}
                setMatrix={setMatrix}
                matrixSize={matrixSize}
                query={query}
                zoom={zoom}
            />
            <ZoomControls
                zoom={zoom}
                setZoom={setZoom}
            />
        </div>
    );
};

export default Workspace;