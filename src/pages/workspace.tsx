import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { solverService } from "../service/SolverService.ts";
import { Output } from "../components/Output.tsx";
import { ZoomControl } from "../components/ZoomControl.tsx";
import { Sidebar } from "../components/Sidebar.tsx";
import { MatrixInput } from "../components/MatrixInput.tsx";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useWorkspaceHandlers } from "../hooks/useWorkspaceHandlers";
import { Query } from "../model/Query.ts";

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
    query: Query;
}

type WorkspaceContentProps = Pick<WorkspaceProps, 'matrix' | 'setMatrix' | 'matrixSize' | 'query' | 'zoom'>;

type WorkspaceSidebarProps = Pick<WorkspaceProps, 'matrix' | 'setMatrix' | 'matrixSize' | 'setMatrixSize' | 'optimization' | 'setOptimization' | 'setJobId' | 'query'>;

const WorkspaceHeader = () => {
    return (
        <div data-aos="fade-down" className="fixed top-5 left-10 flex-center gap-2 bg-white p-4 shadow-sm rounded-lg z-10">
            <Link to="/">
                <AiOutlineArrowLeft className="mr-1" />
            </Link>
            <div className="flex justify-center items-center border-l border-gray-200 px-3 gap-2">
                <img src="/src/assets/logo-outline-xl.png" alt="Logo" className="w-[30px]"/>
                <p className="font-bold">Espace de travail</p>
            </div>
        </div>
    );
}

const WorkspaceContent: React.FC<WorkspaceContentProps> = ({ 
    matrix, 
    setMatrix, 
    matrixSize, 
    query, 
    zoom 
}) => {
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
            <div className="flex items-baseline gap-10">
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
    query,
}) => {
    const { handleMatrixSizeChange, handleSubmit, handleReset, handleExportToPdf } = useWorkspaceHandlers({
        matrix,
        setMatrix,
        matrixSize,
        setMatrixSize,
        optimization,
        setOptimization,
        setJobId,
        query,
    });

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
    );
};

const WorkspaceContainer = ({
    children,
}:{
    children: ReactNode; 
}) => {
    const containerStyle = { width: "fit-content", height: "auto" };

    return (
        <div className="workspace-container min-h-screen" style={containerStyle}>
            {children}
        </div>
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
        <WorkspaceContainer>
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
            <ZoomControl
                zoom={zoom}
                setZoom={setZoom}
            />
        </WorkspaceContainer>
    );
};

export default Workspace;