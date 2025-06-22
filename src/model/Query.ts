export interface Query {
    isLoading: boolean;
    isSuccess: boolean;
    data?: {
        job: {
            status: string;
            result?: {
                optimalValue: number;
                solution: number[];
            };
        };
    };
};