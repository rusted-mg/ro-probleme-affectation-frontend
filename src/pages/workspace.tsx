import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { InputForm, InputFormSubmitEvent } from "../components/InputForm.tsx";
import { solverService } from "../service/SolverService.ts";
import { Output } from "../components/Output.tsx";

const Workspace: React.FC = () => {
    const [jobId, setJobId] = useState<string>();
    const [solved, setSolved] = useState<boolean>(false);
    const query = useQuery({
        queryKey: ["solverJob", jobId],
        queryFn: () => solverService.getJob(jobId as string),
        enabled: !!jobId,
        refetchInterval: (query) => query.state.data?.job.status == "IN_PROGRESS" ? 2000 : false,
    });

    useEffect(() => {
        if (query.isSuccess && query.data?.job.status === "COMPLETED") {
            setSolved(true);
        }
    }, [query.isSuccess, query.data]);

    const handleFormSubmit = async (e: InputFormSubmitEvent) => {
        const uuid = await solverService.launchJob(e.matrix, e.optimization === "MAX" ? e.optimization : "MIN");
        setJobId(uuid);
    };

    return (
        <div className="workspace min-h-screen">
            <div data-aos="fade-down" className="fixed top-5 left-10 flex items-center justify-center gap-2 bg-white p-4 shadow-sm rounded-lg z-10">
                <Link to="/" className="home-link text-lg">←</Link>
                <p className="font-bold border-l border-gray-200 px-2">Optimizer workspace</p>
            </div>
            <div className="flex items-center justify-center gap-15">
                <InputForm solved={solved} setSolved={setSolved} onSubmit={handleFormSubmit}/>
                <Output solved={solved} query={query}/>
            </div>
        </div>
    );
}

export default Workspace;