import { Holiday } from "@/models/holiday.model";

export interface LoginSuccessResponse {
    statusCode: number;
    message: string;
    token: string;
}

export interface ResponsePayload<T> {
    message: string;
    data?: T;
    error: boolean; 
}

export interface HolidaysApiResponse {
    status: string
    data: Holiday[]
}

export interface base64File {
    base64: string
}