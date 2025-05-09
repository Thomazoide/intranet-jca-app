export enum CARGOS {
    RRHH = 'RRHH',
    TI = 'TI',
    GUARDIA = 'GUARDIA',
    SUPERVISOR = 'SUPERVISOR'
}

export interface User {
    ID: number
    created_at: Date
    updated_at: Date
    deleted_at: Date
    nombre: string
    apellido: string
    rut: string
    email: string
    cargo: CARGOS
    super_user: boolean
    contrato?: string
    liquidaciones?: string
}

export interface UserSchema {
    nombre: string
    apellido: string
    rut: string
    email: string
    cargo: CARGOS
    super_user: boolean
    password: string
}