export const API_URL = "http://localhost:8080/"

export function contractsEndpoint(id: number): string {
    return `${API_URL}documentos/${id}/contrato`
}

export function liquidationEndpoint(id: number): string {
    return `${API_URL}documentos/${id}/liquidaciones`
}

const LOGIN_ENDPOINT: string = `${API_URL}login`

//Para obtener un usuario o borrarlo
export function singleUserEndpoint(id: number): string {
    return `${API_URL}usuarios/${id}`
}

const USERS_ENDPOINT: string = `${API_URL}usuarios`