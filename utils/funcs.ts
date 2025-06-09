import { API_URL } from "@/constants/constants"
import { ValidateTokenRequest } from "@/constants/requestsPayloads"
import { ResponsePayload } from "@/constants/responsePayloads"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { router } from "expo-router"


export const checkToken = async () => {
    const auxToken: string | null = await AsyncStorage.getItem("token")
    if (!auxToken) {
        await AsyncStorage.removeItem("token")
        router.replace("/(tabs)")
    }
    const ENDPOINT: string = `${API_URL}usuarios/check-token`
    const payload: ValidateTokenRequest = {
        token: auxToken!
    }
    const response = (await axios.post(ENDPOINT, payload)).data as ResponsePayload<boolean>
    console.log(response)
    if (response.data !== true) {
        await AsyncStorage.removeItem("token")
        router.replace("/(tabs)")
    }
}