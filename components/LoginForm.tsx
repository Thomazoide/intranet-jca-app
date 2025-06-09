import { Button, TextInput, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { LoginPayload } from "@/constants/requestsPayloads";
import { API_URL, LOGIN_ENDPOINT } from "@/constants/constants";
import { ResponsePayload } from "@/constants/responsePayloads";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Circle } from "react-native-progress";
import { router } from "expo-router";
import { format } from "rut.js"
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { User } from "@/models/user.model";

export default function LoginForm() {
    const [rut, setRut] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [token, setToken] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>();
    const [isSuperUser, setIsSuperUser] = useState<boolean>(false);

    async function submitForm() {
        if(!rut || !password) {
            setError(new Error("Se deben llenar todos los campos"))
            return
        }
        const newRut = format(rut!, { dots: false })
        // Aquí se debería hacer la petición a la API
        const payload: LoginPayload = {
          rut: newRut,
          password: password!
        }
        try{  
            setLoading(true)
            const response = await (await axios.post(LOGIN_ENDPOINT, payload)).data as ResponsePayload<{token: string}>
            const userData: User = jwtDecode(response.data!.token)
            if(userData.isAdmin){
                setIsSuperUser(true)
            }
            await AsyncStorage.setItem("token", response.data!.token)
            setToken(response.data!.token)
            setLoading(false)
        }catch(er){
            console.log(er)
            let fetchErr: Error = new Error((er as Error).message)
            console.log(fetchErr.message)
            setError(fetchErr)
            setLoading(false)
        }
    }

    async function checkToken(){
        const auxToken: string | null = await AsyncStorage.getItem("token")
        if(auxToken){
            const isTokenValid = (await axios.post(`${API_URL}usuarios/check-token`)).data as ResponsePayload<boolean>
            if(!isTokenValid.data){
                return
            }
            router.push("/(user)/landing")
        }
    }

    useEffect( () => {
        checkToken()
        if(token){
            console.log("redirigiendo...")
            router.push("/(user)/landing")
        }
    }, [token] )

    return (
        <ThemedView>
            <ThemedText type="title" style={styles.titleContainer}>Inicie sesión</ThemedText>
            <ThemedView style={styles.inputs}>
                <TextInput placeholder="Rut" style={styles.textInput} onChangeText={(text) => setRut(text)}/>
                <TextInput placeholder="Clave" secureTextEntry style={styles.textInput} onChangeText={(text) => setPassword(text)}/>
            </ThemedView>
            { 
                !loading ?
                <Button title="Iniciar sesión" onPress={submitForm} color="#132237" disabled={loading} />
            :
                <ThemedView style={styles.inputs} >
                    <Circle size={25} indeterminate={true}/>
                </ThemedView>
            }
            {
                error && 
                <ThemedText>
                {error.message}
                </ThemedText>
            }
        </ThemedView>
    );
}



const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginVertical: 12,
        textAlign: 'center'
    },
    inputs: {
        flexDirection: 'column',
        gap: 12,
        marginVertical: 12,
        alignItems: 'center'
    },
    textInput: {
        padding: 12,
        borderWidth: 2,
        borderColor: 'yellow',
        borderRadius: 16,
        borderStyle: 'solid',
        backgroundColor: 'white',
        width: '80%',
    }
});