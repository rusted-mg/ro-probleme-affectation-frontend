import { ChangeEvent } from "react";
import { GiBrain, GiBackwardTime, GiFiles } from "react-icons/gi";

interface SidebarProps {
    matrixSize: number;
    optimization: string;
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
    setOptimization: (value: string) => void;
    handleMatrixSizeChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    handleReset: () => void;
    handleExportToPdf: () => void;
}

const ButtonContainer = ({ 
    query, 
    handleSubmit, 
    handleReset, 
    handleExportToPdf 
}: Pick<SidebarProps, 'query' | 'handleSubmit' | 'handleReset' | 'handleExportToPdf'>) => {
    return (
        <div className="space-y-2">
            {
                query.isSuccess && query.data?.job.status === "COMPLETED" && query.data?.job.result ? (
                    <>
                        <button className="w-full bg-blue-200 hover:bg-blue-300 text-blue-500 py-2 px-4 rounded flex items-center justify-center" onClick={handleSubmit}>
                            <GiBrain className="mr-2" /> Résoudre à nouveau
                        </button>
                        <button className="w-full bg-pink-200 hover:bg-pink-300 text-pink-600 py-2 px-4 rounded flex items-center justify-center" onClick={handleReset}>
                            <GiBackwardTime className="mr-2" /> Réinitialiser
                        </button>
                        <button className="w-full border border-pink-400 text-pink-400 py-2 px-4 rounded flex items-center justify-center" onClick={handleExportToPdf}>
                            <GiFiles className="mr-2" /> Exporter en PDF
                        </button>
                    </>
                ) : (
                    <button className="w-full bg-blue-200 hover:bg-blue-300 text-blue-500 py-2 px-4 rounded flex items-center justify-center" onClick={handleSubmit}>
                        <GiBrain className="mr-2" /> Résoudre
                    </button>
                )
            }
        </div>
    );
};

const Form = ({ 
    matrixSize, 
    optimization, 
    setOptimization, 
    handleMatrixSizeChange 
}: Pick<SidebarProps, 'matrixSize' | 'optimization' | 'setOptimization' | 'handleMatrixSizeChange'>) => {
    return (
        <div className="mb-5">
            <label className="block">
                <p className="block text-left text-gray-700 text-sm font-bold mb-2">
                    Nombre de postes :
                </p>
                <input
                    className="appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="number"
                    value={matrixSize}
                    min={2}
                    max={10}
                    onChange={handleMatrixSizeChange}
                />
            </label>
            <label className="block mt-5">
                <p className="block text-left text-gray-700 text-sm font-bold mb-2">
                    Type d'optimisation d'affectation :
                </p>
                <select
                    className="appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    value={optimization}
                    onChange={(e) => setOptimization(e.target.value)}>
                    <option value="MIN" defaultChecked={true}>
                        Minimisation
                    </option>
                    <option value="MAX">Maximisation</option>
                </select>
            </label>
        </div>
    );
};

export const Sidebar = ({ 
    matrixSize, 
    optimization, 
    query,
    setOptimization, 
    handleMatrixSizeChange, 
    handleSubmit,
    handleReset,
    handleExportToPdf
}: SidebarProps) => {
    return (
        <div data-aos="fade-left" className="fixed bg-white p-5 shadow-md z-10 top-0 right-0 h-full">
            <Form 
                matrixSize={matrixSize} 
                optimization={optimization} 
                setOptimization={setOptimization} 
                handleMatrixSizeChange={handleMatrixSizeChange} 
            />
            <ButtonContainer 
                query={query} 
                handleSubmit={handleSubmit} 
                handleReset={handleReset} 
                handleExportToPdf={handleExportToPdf} 
            />
        </div>
    );
};