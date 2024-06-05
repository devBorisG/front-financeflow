export interface BackendResponse {
    data: {
        messages: {
            level: string,
            content: string,
        }[];
        data: unknown[];
        token: string;
    }
}