import KarinForm from "@/components/karinForm";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";


export default function LeyKarin() {
    return(
        <ThemedView style={styles.fullBody}>
            <ThemedText>
                Formulario ley Karin
            </ThemedText>
            <ThemedView style={styles.formFrame}>
                <KarinForm />
            </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    fullBody: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    formFrame: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "blue",
        padding: 10,
    }
})