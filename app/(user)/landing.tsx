import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet } from "react-native";

export default function LandingScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#E9E9E7', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/escudo.webp')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView>
                <ThemedText></ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute'
    }
})