export interface LoginPayload {
    rut: string;
    password: string;
}

export interface AddFileRequest {
    file: Base64URLString;
    name: string
}

export interface AddManyFilesRequest {
    files: AddFileRequest[];
}

export interface ValidateTokenRequest {
    token: string;
}

export interface SetLiquidationsPayload {
    Liquidations: Base64URLString
    ID: number
}

export interface AccountRequestPayload {
    Rut: string
    Email: string
}