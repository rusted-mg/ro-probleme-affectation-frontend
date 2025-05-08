import { ChangeEvent } from "react";

interface SidebarProps {
    matrixSize: number;
    optimization: string;
    solved: boolean;
    setOptimization: (value: string) => void;
    handleMatrixSizeChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    handleReset: () => void;
    handleExportToPdf: () => void;
}

export const Sidebar = ({ 
    matrixSize, 
    optimization, 
    solved,
    setOptimization, 
    handleMatrixSizeChange, 
    handleSubmit,
    handleReset,
    handleExportToPdf
}: SidebarProps) => {
    return (
        <div className="fixed bg-white p-5 shadow-md z-10 top-0 right-0 h-full">
            <label className="block mb-2">
                <p className="block text-left text-gray-700 text-sm font-bold mb-2" >
                    Dimension de la matrice :
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
            <br />
            <label className="block mb-2">
                <p className="block text-left text-gray-700 text-sm font-bold mb-2" >
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
            <br />
            <div className="space-y-2">
                {
                    solved ? (
                        <>
                            <button className="w-full bg-orange-200 text-orange-600 py-2 px-4 rounded" onClick={handleReset}>
                                Réinitialiser
                            </button>
                            <button className="w-full border border-orange-400 text-orange-400 py-2 px-4 rounded" onClick={handleExportToPdf}>
                                Exporter en PDF
                            </button>
                        </>
                    ) : (
                        <button className="w-full bg-blue-200 text-blue-500 py-2 px-4 rounded" onClick={handleSubmit}>
                            Résoudre
                        </button>
                    )
                }
            </div>
        </div>
    );
};