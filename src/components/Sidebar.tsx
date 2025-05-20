import { ChangeEvent, ReactNode, useState } from "react";
import { GiBrain, GiBackwardTime, GiFiles, GiOfficeChair, GiSettingsKnobs } from "react-icons/gi";
import { Query } from "../model/Query";

interface SidebarProps {
    matrixSize: number;
    optimization: string;
    query: Query;
    setOptimization: (value: string) => void;
    handleMatrixSizeChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    handleReset: () => void;
    handleExportToPdf: () => void;
}

const SidebarButtonContainer = ({ 
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
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex-center" onClick={handleExportToPdf}>
                            <GiFiles className="mr-2" /> Exporter en pdf
                        </button>
                        <div className="flex gap-2">
                            <button title="Résoudre à nouveau" className="w-full bg-blue-200 hover:bg-blue-300 text-blue-500 py-2 px-4 rounded flex-center" onClick={handleSubmit}>
                                <GiBrain className="mr-2" />
                            </button>
                            <button title="Réinitialiser" className="w-full bg-blue-200 hover:bg-blue-300 text-blue-500 py-2 px-4 rounded flex-center" onClick={handleReset}>
                                <GiBackwardTime className="mr-2" />
                            </button>
                        </div>
                    </>
                ) : (
                    <button className="w-full text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded flex-center" onClick={handleSubmit}>
                        <GiBrain className="mr-2" /> Résoudre
                    </button>
                )
            }
        </div>
    );
};

const SidebarForm = ({ 
    matrixSize, 
    optimization, 
    setOptimization, 
    handleMatrixSizeChange 
}: Pick<SidebarProps, 'matrixSize' | 'optimization' | 'setOptimization' | 'handleMatrixSizeChange'>) => {
    return (
        <div className="mb-8">
            <label className="block">
                <p className="text-left text-gray-500 text-sm mb-4 flex items-center">
                    <GiOfficeChair className="mr-2 text-blue-500"/> Nombre de postes
                </p>
                <input
                    className="appearance-none border-2 border-gray-200 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight"
                    type="number"
                    name="matrixSize"
                    value={matrixSize}
                    min={2}
                    max={10}
                    onChange={handleMatrixSizeChange}
                />
            </label>
            <label className="block mt-5">
                <p className="text-left text-gray-500 text-sm mb-4 flex items-center">
                    <GiSettingsKnobs className="mr-2 text-blue-600" /> Type d'optimisation
                </p>
                <select
                    className="appearance-none border-2 border-gray-200 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight"
                    value={optimization}
                    name="optimizationType"
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

const SidebarToggler = ({
    showMenu,
    setShowMenu
}:{
    showMenu:boolean;
    setShowMenu: (showMenu: boolean) => void;
}) => {
    const menuButtonContainerClassName = `fixed top-0 right-0 py-2 z-20 my-4 mx-5 ${!showMenu && 'rounded-md bg-white shadow-sm'}`;

    const toggleMenuVisibility = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div data-aos="fade-left" className={menuButtonContainerClassName}>
            <button onClick={toggleMenuVisibility} className="flex items-center gap-1">
                <span className="menu-dot rounded-full bg-pink-600"></span>
                <span className="menu-dot rounded-full bg-purple-600"></span>
                <span className="menu-dot rounded-full bg-blue-600"></span>
            </button>
        </div>
    );
}

const SidebarContainer = ({
    children
}:{
    children: ReactNode;
}) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <>
            <SidebarToggler showMenu={showMenu} setShowMenu={setShowMenu}/>
            {
                showMenu && 
                <div data-aos="fade-left" data-aos-duration="10" className="fixed bg-white p-5 pl-7 pr-8 shadow-md z-10 top-0 right-0 h-full min-w-[260px]">
                    <div className="flex-center mb-7 styled-text text-4xl font-bold mt-8">
                        Paramètres
                    </div>
                    { children }
                </div>
            }
        </>
    );
}

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
        <SidebarContainer>
            <SidebarForm 
                matrixSize={matrixSize} 
                optimization={optimization} 
                setOptimization={setOptimization} 
                handleMatrixSizeChange={handleMatrixSizeChange} 
            />
            <SidebarButtonContainer 
                query={query} 
                handleSubmit={handleSubmit} 
                handleReset={handleReset} 
                handleExportToPdf={handleExportToPdf} 
            />
        </SidebarContainer>
    );
};