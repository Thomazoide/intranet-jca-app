import { User } from "@/models/user.model"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { jwtDecode } from "jwt-decode"
import { Dispatch, SetStateAction } from "react"

export interface RequestSelection {
    ID: number
    showForm: boolean
}

export interface Contract {
    uri: string
    type: string
    name: string
}

export const API_URL = "https://jtfb87sn-3000.brs.devtunnels.ms/"
export const HOLIDAYS_API_URL = "https://api.boostr.cl/holidays.json"

export function contractsEndpoint(id: number): string {
    return `${API_URL}usuarios/${id}/contrato/base64`
}

export function liquidationEndpoint(id: number): string {
    return `${API_URL}documentos/${id}/liquidaciones`
}

export const LOGIN_ENDPOINT: string = `${API_URL}usuarios/login`

export const ACCOUNT_REQUEST_ENDPOINT: string = `${API_URL}solicitudes`

//Para obtener un usuario o borrarlo
export function singleUserEndpoint(id: number): string {
    return `${API_URL}usuarios/${id}`
}

export const decodeToken = async ( setUserData: Dispatch<SetStateAction< User | undefined>>, setError: Dispatch<SetStateAction<Error | null>> ) => {
    const storedToken = await AsyncStorage.getItem("token")
    if (storedToken) {
        const decodedToken = jwtDecode(storedToken)
        try{
            const parsedData: User = JSON.parse(decodedToken.sub!)
            setUserData(parsedData)
        }catch(err: any){
            router.navigate("/(tabs)")
            const newError: Error = err
            setError(newError)
        }
    }
}

export const getToken = async (setToken: Dispatch<SetStateAction<string | null>>): Promise<string | null> => {
    const token = await AsyncStorage.getItem("token")
    if (token) {
        console.log(token)
        setToken(token)
        return token
    }
    return null
}

export const GetContractUploadEndpoint = (id: number): string => {
    return `${API_URL}documentos/${id}/contrato`
}

export const USERS_ENDPOINT: string = `${API_URL}usuarios`

export function GetLoginEndpoint(): string {
    return `${API_URL}login`
}



