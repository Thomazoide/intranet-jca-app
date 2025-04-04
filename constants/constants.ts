import { User } from "@/models/user.model"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { jwtDecode } from "jwt-decode"
import { Dispatch, SetStateAction } from "react"

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

export const getToken = async (): Promise<string | null> => {
    const token = await AsyncStorage.getItem("token")
    if (token) {
        console.log(token)
        return `access_token=${token};`
    }
    return null
}

const USERS_ENDPOINT: string = `${API_URL}usuarios`