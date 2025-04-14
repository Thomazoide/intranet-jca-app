import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Button } from "react-native";


export default function MyAccount() {

    const onSesionClose = () => {
        AsyncStorage.removeItem("token")
        router.replace("/(tabs)")
    }

    return (
        <ThemedView>
            <Button title="Cerrar sesión" onPress={onSesionClose} />
        </ThemedView>
    )
}