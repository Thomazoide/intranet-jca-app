import { Image, StyleSheet, TextInput } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useState } from "react";


export default function RequestAccountForm() {
    const [rut, setRut] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    return(
        <ThemedView>
            <ThemedText>Ingrese su rut</ThemedText>
            <TextInput placeholder="Rut sin puntos, con guión" style={styles.textInput} onChangeText={(text) => setRut(text)}/>
            <ThemedText>Ingrese su email</ThemedText>
            <TextInput placeholder="correo@email.com" style={styles.textInput} onChangeText={(text) => setEmail(text)} />
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
        padding: 12,
        borderWidth: 2,
        borderColor: 'yellow',
        borderRadius: 16,
        borderStyle: 'solid',
        backgroundColor: 'white'
    },
    formContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    }
})