import {SolverApi} from "../api/SolverApi.ts";

export const solverService = {
    launchJob: SolverApi.launchJob,
    getJob: SolverApi.fetchJob
};