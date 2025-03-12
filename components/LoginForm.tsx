import { Button, TextInput, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { LoginPayload } from "@/constants/requestsPayloads";
import { API_URL } from "@/constants/constants";
import { LoginSuccessResponse } from "@/constants/responsePayloads";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Circle } from "react-native-progress";
import { router } from "expo-router";

export default function LoginForm() {
    const [rut, setRut] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [token, setToken] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>();
    async function submitForm() {
        // Aquí se debería hacer la petición a la API
        const payload: LoginPayload = {
          rut,
          password
        }
        try{  
            setLoading(true)
            const response = await fetch(API_URL+"login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            if (!response.ok) {
                throw new Error("Error en la petición")
            }
            const data: LoginSuccessResponse = await response.json()
            setToken(data.token)
            setLoading(false)
            AsyncStorage.setItem("token", data.token)
        }catch(err: any){
            let fetchErr: Error = err
            setError(fetchErr)
            setLoading(false)
        }
    }

    async function checkToken(){
        const auxToken: string | null = await AsyncStorage.getItem("token")
        if(auxToken){
            setToken(auxToken)
        }
    }

    useEffect( () => {
        checkToken()
        if(token){
            router.replace("/(user)/landing")
        }
    }, [token] )

  return (
    <ThemedView>
      <ThemedText type="title" style={styles.titleContainer}>Inicie sesión</ThemedText>
      <ThemedView style={styles.inputs}>
        <TextInput placeholder="Rut" style={styles.textInput} onChangeText={(text) => setRut(text)}/>
        <TextInput placeholder="Clave" secureTextEntry style={styles.textInput} onChangeText={(text) => setPassword(text)}/>
      </ThemedView>
      { !loading ?
      <Button title="Iniciar sesión" onPress={submitForm} color="#132237" disabled={loading} />
      :
      <ThemedView style={styles.inputs} >
        <Circle size={25} indeterminate={true}/>
      </ThemedView>
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
        backgroundColor: 'white'
    }
});