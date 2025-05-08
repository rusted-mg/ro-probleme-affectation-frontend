import { ChangeEvent } from "react";

interface SidebarProps {
    matrixSize: number;
    optimization: string;
    setOptimization: (value: string) => void;
    handleMatrixSizeChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
}

export const Sidebar = ({ 
    matrixSize, 
    optimization, 
    setOptimization, 
    handleMatrixSizeChange, 
    handleSubmit 
}: SidebarProps) => {
    return (
        <div className="absolute bg-white p-4 shadow-md z-10 top-0 right-0 h-full">
            <label className="block mb-2">
                <p className="block text-left text-gray-700 text-sm font-bold mb-2" >
                    Dimension de la matrice :
                </p>
                <input
                    className="shadow appearance-none border border-amber-50 rounded w-full py-2 px-3 text-gray-700 leading-tight"
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
                    className="shadow appearance-none border border-amber-50 rounded w-full py-2 px-3 text-gray-700 leading-tight" 
                    value={optimization} 
                    onChange={(e) => setOptimization(e.target.value)}>
                    <option value="MIN" defaultChecked={true}>
                        Minimisation
                    </option>
                    <option value="MAX">Maximisation</option>
                </select>
            </label>
            <br />
            <button className="w-full" onClick={handleSubmit}>Résoudre</button>
        </div>
    );
};