import KarinForm from "@/components/karinForm";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { JCA_BLUE, JCA_YELLOW } from "@/constants/constants";
import { StyleSheet } from "react-native";


export default function LeyKarin() {
    return(
        <ThemedView style={styles.fullBody}>
            <ThemedText style={{
                color: "white",
                fontSize: 24
            }} >
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
        padding: 2,
        paddingVertical: 45,
        backgroundColor: JCA_BLUE
    },
    formFrame: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#132237",
        padding: 10,
    }
})