import { Alert, Button, StyleSheet, TextInput } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useState } from "react";
import { AccountRequestPayload } from "@/constants/requestsPayloads";
import { format } from "rut.js";
import axios from "axios";
import { ACCOUNT_REQUEST_ENDPOINT } from "@/constants/constants";
import { ResponsePayload } from "@/constants/responsePayloads";


export default function RequestAccountForm() {
    const [rut, setRut] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    const sendRequest = async () => {
        if (!rut || !email) {
            Alert.alert("Error", "Por favor, complete todos los campos")
            return
        }
        setLoading(true)
        try{
            const payload: AccountRequestPayload = {
                rut: format(rut, {dots: false}),
                email: email
            }
            const response: ResponsePayload = (await axios.post(ACCOUNT_REQUEST_ENDPOINT, payload)).data
            if (response.error) {
                throw new Error(response.error)
            }
            setError(null)
            setSuccess(true)
        }catch(err: any){
            setError(new Error('Error al enviar solicitud'))
            setSuccess(false)
        }finally{
            setLoading(false)
        }
    }

    return(
        <ThemedView style={styles.formContainer} >
            <ThemedText>Ingrese su rut</ThemedText>
            <TextInput placeholder="Rut sin puntos, con guión" style={styles.textInput} onChangeText={(text) => setRut(text)}/>
            <ThemedText>Ingrese su email</ThemedText>
            <TextInput placeholder="correo@email.com" style={styles.textInput} onChangeText={(text) => setEmail(text)} />
            <Button title={loading ? "Cargando..." : "Enviar solicitud"} onPress={sendRequest} disabled={ loading ? true : false } color={'#132237'} />
            {
                error && (
                    <ThemedText style={{color: 'red'}} >
                        {error.message}
                    </ThemedText>
                )
            }
            {
                success && (
                    <ThemedText style={{color: 'green'}} >
                        Solicitud enviada con éxito
                    </ThemedText>
                )
            }
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    headerLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute'
    },
    textInput: {
        width: 300,
        padding: 12,
        borderWidth: 2,
        borderColor: 'yellow',
        borderRadius: 16,
        borderStyle: 'solid',
        backgroundColor: 'white',
        textAlign: 'center'
    },
    formContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5
    }
})