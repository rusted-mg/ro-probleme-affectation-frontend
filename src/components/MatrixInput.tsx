import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface MatrixInputProps {
    matrix: (number | null)[][];
    onMatrixChange: (row: number, col: number, newValue: string) => void;
}

const ZoomControls = ({
    zoom,
    isFocused,
    onZoomIn,
    onZoomOut,
    onZoomChange,
    onFocus,
    onBlur,
}: {
    zoom: number;
    isFocused: boolean;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onZoomChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
}) => {
    return (
        <div data-aos="fade-up" className="fixed bottom-5 left-10 flex items-center shadow-sm bg-white p-1 rounded z-10">
            <button onClick={onZoomOut} className="px-3 py-1 rounded">
                -
            </button>
            <div className="relative border-r border-l border-gray-200 px-2">
                <input
                    type="number"
                    value={zoom}
                    onChange={onZoomChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className="w-16 text-center rounded border border-gray-50"
                    min={10}
                    max={200}
                />
                {!isFocused && (
                    <span className="absolute inset-y-0 right-2 flex items-center">
                        %
                    </span>
                )}
            </div>
            <button onClick={onZoomIn} className="px-3 py-1 rounded">
                +
            </button>
        </div>
    );
};
const MatrixTable = ({
    matrix,
    zoom,
    onMatrixChange,
}: {
    matrix: (number | null)[][];
    zoom: number;
    onMatrixChange: (row: number, col: number, newValue: string) => void;
}) => {
    return (
        <div
            data-aos="fade-in"
            className="overflow-auto"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top left" }}
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
                            {row.map((val, c) => (
                                <td key={c} className="border">
                                    <input
                                        type="number"
                                        value={val || ""}
                                        className="w-12 border-none text-center placeholder:text-gray-300"
                                        required={true}
                                        onChange={(e) => onMatrixChange(r, c, e.target.value)}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
const Indications = ({
    matrix,
}: {
    matrix: (number | null)[][];
}) => {
    const [removed, setRemoved] = useState(false);

    const handleRemove = () => {
        setRemoved(true);
    }

    return !removed && (
        <div
            data-aos="fade-in"
            className="relative bg-white border-3 border-gray-100 p-4 rounded-md z-10 min-w-[300px]"
        >
            <button
                onClick={handleRemove}
                className="float-right text-gray-400 hover:text-gray-600 no-padding"
                aria-label="Remove"
            >
                <FaTimes />
            </button>
            {matrix.length > 0 ? (
                <p className="mb-2 font-bold">Commencez par remplir la matrice.</p>
            ) : (
                <p className="mb-2 font-bold">Entrez d'abord le nombre de postes...</p>
            )}
            {matrix.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="rounded-4xl bg-blue-300 p-2"></div>
                        <p className="text-sm">Postes</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="rounded-4xl bg-blue-200 p-2"></div>
                        <p className="text-sm">Candidats</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export const MatrixInput = ({ matrix, onMatrixChange }: MatrixInputProps) => {
    const [zoom, setZoom] = useState(100);
    const [isFocused, setIsFocused] = useState(false);

    const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 200));
    const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 10));
    const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newZoom = Math.min(Math.max(Number(e.target.value), 0), 200);
        setZoom(newZoom);
    };

    return (
        <div>
            <ZoomControls
                zoom={zoom}
                isFocused={isFocused}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onZoomChange={handleZoomChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <div className="flex items-baseline justify-center gap-15">
                <Indications matrix={matrix} />
                <MatrixTable matrix={matrix} zoom={zoom} onMatrixChange={onMatrixChange} />
            </div>
        </div>
    );
};