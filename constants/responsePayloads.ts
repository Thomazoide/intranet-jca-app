import { Holiday } from "@/models/holiday.model";

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

export interface HolidaysApiResponse {
    status: string
    data: Holiday[]
}