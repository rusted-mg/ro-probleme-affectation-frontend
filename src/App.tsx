import './App.css'
import {InputForm, InputFormSubmitEvent} from "./components/InputForm.tsx";
import {solverService} from "./service/SolverService.ts";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import LandingPage from './components/LandingPage.tsx';

function App() {
    const [jobId, setJobId] = useState<string>();
    const [showLandingPage, setShowLandingPage] = useState<boolean>(true);
    const query = useQuery({
        queryKey: ["solverJob", jobId],
        queryFn: () => solverService.getJob(jobId as string),
        enabled: !!jobId,
        refetchInterval: (query) => query.state.data?.job.status == "IN_PROGRESS" ? 2000 : false,
    });

    const handleFormSubmit = async (e: InputFormSubmitEvent) => {
        const uuid = await solverService.launchJob(e.matrix, e.optimization === "MAX" ? e.optimization : "MIN");
        setJobId(uuid);
    };

    const handleChangePage = async () => {
        setShowLandingPage(!showLandingPage);
    };

    useEffect(() => {
        const checkElement = () => {
            const reactTool = document.querySelector('.tsqd-open-btn-container');
            if (reactTool) {
                reactTool.classList.toggle('hide', showLandingPage);
            } else {
                requestAnimationFrame(checkElement);
            }
        };

        checkElement();
    }, [showLandingPage]);

    return (
        <>
            {
                showLandingPage ?
                <LandingPage handleChangePage={handleChangePage}/>
                :
                <div className="container">
                    <InputForm onSubmit={handleFormSubmit}/>
                    {}
                    {(query.isLoading || (query.isSuccess && query.data?.job.status != "COMPLETED")) && (
                        <div>Solving...</div>
                    )}
                    {(query.isSuccess && query.data?.job.status == "COMPLETED") && (
                        <div>
                            <div>La valeur optimale est <strong>{query.data?.job.result?.optimalValue}</strong></div>
                            <div>L'affectation optimale est :
                                <ol>
                                    {query.data?.job.result.solution.map(((value, i) => (<li key={i}>{value + 1}</li>)))}
                                </ol>
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    )
}

export default App
