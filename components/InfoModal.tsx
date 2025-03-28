import { TouchableOpacity } from "react-native"
import { ThemedText } from "./ThemedText"
import { ThemedView } from "./ThemedView"

type modalType = "error" | "success"

interface ModalProps{
    type: modalType
    title: string
    message: string
}

export default function InfoModal(props: Readonly<ModalProps>) {
    const bgColor: string = props.type === "error" ? "red" : "green";
    return (
        <ThemedView style={{ backgroundColor: bgColor, padding: 20 }}>
            <ThemedText style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{props.title}</ThemedText>
            <ThemedText style={{ marginBottom: 20 }}>{props.message}</ThemedText>
            <TouchableOpacity style={{ backgroundColor: '#3399FF', padding: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }} onPress={() => { }}>
                <ThemedText style={{ color: 'white', fontSize: 16 }}>Aceptar</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    )
}