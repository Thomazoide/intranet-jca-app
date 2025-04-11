export interface AccountRequest {
    ID: number
    rut: string
    email: string
    validated: boolean
    created_at?: string
    updated_at?: string
    deleted_at?: string
}