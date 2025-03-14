import {SolverApi} from "../api/SolverApi.ts";

export const solverService = {
    launchJob: async (matrix: number[][], optimization: "MIN" | "MAX") => {
        try {
            const responseData = await SolverApi.launchJob(matrix, optimization);
            return responseData.job_id;
        } catch (e) {
            console.error("Unable to start job ", e);
        }
    },
    getJob: async (jobId: string) => {
        try {
            return await SolverApi.fetchJob(jobId);
        } catch (e) {
            console.error("Unable to get job", jobId, " ", e);
        }
    },
};