export type OptimizationType = "MIN" | "MAX";

export interface SolverJob {
    job: Job;
    snapshots: Snapshot[];
}

export interface Job {
    id: string;
    status: "IN_PROGRESS" | "COMPLETED";
    result: Result;
}

export interface Result {
    optimalValue: number;
    solution: number[];
}

export interface Snapshot {
    id: string;
    jobId: string;
    currentStep: string;
    state: "SOLVING" | "SOLVED";
    matrix: string[];
    optimizationType: OptimizationType;
    solution: number[] | null;
    optimalValue: number;
    ceiling: number;
    markedRows: number[];
    markedCols: number[];
    framedZeroes: Coord[];
    struckOutZeroes: Coord[];
    rowMinCols: number[];
    colMinRow: number[];
}

export interface Coord {
    r: number;
    c: number;
}