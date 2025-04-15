import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Button, StyleSheet } from "react-native";


export default function MyAccount() {

    const onSesionClose = () => {
        AsyncStorage.removeItem("token")
        router.replace("/(tabs)")
    }

    return (
        <ThemedView style={styles.container} >
            <Button title="Cerrar sesión" onPress={onSesionClose} />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        paddingVertical: 30,
        height: "100%"
    }
})