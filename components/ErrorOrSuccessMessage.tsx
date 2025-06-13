import { StyleSheet } from "react-native"
import { ThemedView } from "./ThemedView"
import { ThemedText } from "./ThemedText"

interface EOSMProps {
    message: string
    isError: boolean
}

export default function ErrorOrSuccessMessage(props: Readonly<EOSMProps>){
    if(props.isError === true){
        return(
            <ThemedView style={styles.errorBody}>
                <ThemedText style={styles.title}>Error en la solicitud</ThemedText>
                <ThemedText style={styles.text}>{props.message}</ThemedText>
            </ThemedView>
        )
    }
    return(
        <ThemedView style={styles.successBody}>
            <ThemedText style={styles.title} > Éxito en la solicitud </ThemedText>
            <ThemedText style={styles.text} > {props.message} </ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    successBody: {
        display: "flex",
        flexDirection: "column",
        color: "white",
        backgroundColor: "#16a34a",
        padding: 12,
        margin: 5,
        gap: 5,
        borderStyle: "solid",
        borderRadius: 35,
        borderWidth: 3,
        borderColor: "white",
        textAlign: "center",
        alignItems: "center"
    },
    errorBody: {
        display: "flex",
        flexDirection: "column",
        color: "white",
        backgroundColor: "#dc2626",
        padding: 12,
        margin: 5,
        gap: 5,
        borderStyle: "solid",
        borderRadius: 35,
        borderWidth: 3,
        borderColor: "white",
        textAlign: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        color: "white"
    },
    text: {
        color: "white"
    }
})