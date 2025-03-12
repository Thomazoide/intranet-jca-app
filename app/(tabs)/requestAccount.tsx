import ParallaxScrollView from "@/components/ParallaxScrollView";
import RequestAccountForm from "@/components/requestAccountForm";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { Button, Image, StyleSheet } from "react-native";


export default function RequestAccount() {
    const goBack = () => {
        router.back()
    }
    return(
        <ParallaxScrollView
        headerBackgroundColor={{light: "E9E9E7",dark: "1D3D47"}}
        headerImage={
            <Image 
            source={require('@/assets/images/escudo.webp')}
            style={styles.headerLogo}
            />
        }
        >
            <ThemedView>
                <Button title="Volver" onPress={goBack}  />
            </ThemedView>
            <ThemedView>
                <ThemedText>
                    Solicitar cuenta
                </ThemedText>
            </ThemedView>
            <RequestAccountForm/>
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    headerLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute'
    }
})