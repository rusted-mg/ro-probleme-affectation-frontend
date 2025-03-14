import {API} from "./axios.ts";
import {SolverJob} from "../model/Solver.ts";

export const SolverApi = {
    launchJob: async (matrix: number[][], optimization: "MIN" | "MAX"): Promise<{ job_id: string }> => {
        const response = await API.post<{ job_id: string }>(
            "/assignments",
            {matrix: matrix, optimization: optimization.toLowerCase()}
        );
        return response.data;
    },

    fetchJob: async (jobId: string): Promise<SolverJob> => {
        const response = await API.get<SolverJob>(`/assignments/${jobId}`);
        return response.data;
    },
}