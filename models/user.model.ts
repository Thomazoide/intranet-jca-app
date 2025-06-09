export enum CARGOS {
    RRHH = 'RRHH',
    TI = 'TI',
    GUARDIA = 'GUARDIA',
    SUPERVISOR = 'SUPERVISOR'
}

export interface User {
    id: number
    fullName: string
    rut: string
    email: string
    cargo: CARGOS
    isAdmin: boolean
    contrato?: string
    password?: string
}
