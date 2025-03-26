import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/models/user.model";
import { useNavigation } from "expo-router";

export default function LandingScreen() {
    const [userData, setUserData] = useState<User>()
    const [error, setError] = useState<Error | null>(null)

    const decodeToken = async () => {
        const storedToken = await AsyncStorage.getItem("token")
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken)
            try{
                const parsedData: User = JSON.parse(decodedToken.sub!)
                setUserData(parsedData)
            }catch(err: any){
                const newError: Error = err
                setError(newError)
            }
        }
    }

    const checkToken = async () => {
        const auxToken: string | null = await AsyncStorage.getItem("token")
        if (!auxToken) {
            useNavigation("/")
        }
        
    }

    useEffect(() => {
        decodeToken()
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
        gap: 4
    },
    gridElement: {
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: '#132237',
        backgroundColor: '#fab515',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 13,
        borderRadius: '15px'
    }
})