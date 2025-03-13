import {API} from "./axios.ts";
import {SolverJob} from "../model/Solver.ts";

export const SolverApi = {
    launchJob: async (matrix: number[][], optimization: "MIN" | "MAX"): Promise<string> => {
        const response = await API.post<unknown, { jobId: string }>(
            "/assignments",
            {matrix: matrix, optimization: optimization}
        );
        return response.jobId;
    },

    fetchJob: async (jobId: string): Promise<SolverJob> => {
        return await API.get<unknown, SolverJob>(`/assignments/${jobId}`);
    },
}