export interface BackendResponse {
    data: {
        messages: {
            level: string,
            content: string,
        }[];
        data: any[];
        token: string;
    }
}