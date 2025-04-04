import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { User } from "@/models/user.model";
import { CircleSnail } from 'react-native-progress'
import { checkToken } from "@/utils/funcs";
import { decodeToken } from "@/constants/constants";

export default function LandingScreen() {
    const [userData, setUserData] = useState<User>()
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        decodeToken(setUserData, setError)
        const verifyTokenInterval = setInterval(checkToken, 30000)
        return () => clearInterval(verifyTokenInterval)
    }, [])
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#E9E9E7', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/escudo.webp')}
                    style={styles.reactLogo}
                />
            }>
            {
                !userData ?
                <ThemedView style={styles.menu}>
                    <ThemedText>Cargando...</ThemedText>
                    <CircleSnail size={100} indeterminate={true} />
                </ThemedView>
                :
                userData && !error ?
                <ThemedView style={styles.menu}>
                    <ThemedText>Bienvenido/a {userData.nombre}!</ThemedText>
                    <div style={styles.dashboardGrid}>
                        <TouchableOpacity>
                            <div style={styles.gridElement}>
                                <ThemedText>Ver liquidaciones</ThemedText>
                            </div>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <div style={styles.gridElement}>
                                <ThemedText>Ver contrato</ThemedText>
                            </div>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <div style={styles.gridElement}>
                                <ThemedText>Formulario ley Karin</ThemedText>
                            </div>
                        </TouchableOpacity>
                    </div>
                </ThemedView>
                :
                error &&
                <ThemedView style={styles.menu}>
                    <ThemedText>Error al cargar los datos</ThemedText>
                </ThemedView>
            }
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    reactLogo: {
        height: 290,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute'
    },
    menu: {
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%'
    },
    dashboardGrid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 4,
        alignItems: 'center',
        alignContent: 'center',
    },
    gridElement: {
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: '#132237',
        backgroundColor: '#fab515',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 13,
        borderRadius: '15px',
        width: 130,
        textAlign: 'center',
        alignContent: 'center',
        
    }
})