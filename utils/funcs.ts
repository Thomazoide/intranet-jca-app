import { ValidateTokenRequest } from "@/constants/requestsPayloads"
import { ResponsePayload } from "@/constants/responsePayloads"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"


export const checkToken = async () => {
    const auxToken: string | null = await AsyncStorage.getItem("token")
    if (!auxToken) {
        await AsyncStorage.removeItem("token")
        router.replace("/(tabs)")
    }
    const ENDPOINT: string = "http://localhost:8080/login"
    const METHOD: string = "PUT"
    const payload: ValidateTokenRequest = {
        token: auxToken!
    }
    const rawResponse: Response = await fetch(ENDPOINT, {
        method: METHOD,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const response: ResponsePayload = await rawResponse.json()
    console.log(response)
    if (response.data != true) {
        await AsyncStorage.removeItem("token")
        router.replace("/(tabs)")
    }
}