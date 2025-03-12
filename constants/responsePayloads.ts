export interface LoginSuccessResponse {
    statusCode: number;
    message: string;
    token: string;
}

export interface ResponsePayload {
    statusCode: number;
    message: string;
    data?: any;
    error?: string; 
}