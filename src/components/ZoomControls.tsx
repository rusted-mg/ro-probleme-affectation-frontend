import { useState } from "react";

export const ZoomControls = ({
    zoom,
    setZoom,
}: {
    zoom: number;
    setZoom: (zoom: number) => void;
}) => {
    const [isFocused, setIsFocused] = useState(false);
    
    const handleZoomIn = () => {
        const newZoom = Math.min(zoom + 10, 200);
        setZoom(newZoom);
    };

    const handleZoomOut = () => {
        const newZoom = Math.max(zoom - 10, 10);
        setZoom(newZoom);
    };
    
    const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newZoom = Math.min(Math.max(Number(e.target.value), 0), 200);
        setZoom(newZoom);
    };

    return (
        <div data-aos="fade-up" className="fixed bottom-5 left-10 flex items-center shadow-sm bg-white p-1 rounded z-10">
            <button onClick={handleZoomOut} className="px-3 py-1 rounded">
                -
            </button>
            <div className="relative border-r border-l border-gray-200 px-2">
                <input
                    type="number"
                    value={zoom}
                    onChange={handleZoomChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
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
            <button onClick={handleZoomIn} className="px-3 py-1 rounded">
                +
            </button>
        </div>
    );
};