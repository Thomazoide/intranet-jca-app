import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { User } from "@/models/user.model";
import { checkToken } from "@/utils/funcs";
import { decodeToken } from "@/constants/constants";
import HolidaysTable from "@/components/holidaysTable";

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
                userData && !error ?
                <ThemedView style={styles.menu}>
                    <ThemedText style={styles.landingTitle} >Bienvenido/a {userData.nombre}!</ThemedText>
                    <ThemedText style={styles.tableTitle} >Feriados del año</ThemedText>
                    <ThemedView style={styles.dashboardGrid}>
                        <HolidaysTable/>
                    </ThemedView>
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
        height: 250,
        width: 250,
        bottom: 0,
        left: 50,
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
        borderRadius: 25,
        width: 130,
        textAlign: 'center',
        alignContent: 'center',
        
    },
    tableTitle: {
        fontSize: 20,
        marginTop: 15,
        marginBottom: 15,
        fontWeight: "semibold",
        borderStyle: "dashed",
        borderBottomWidth: 1
    },
    landingTitle: {
        fontSize: 24,
        marginTop: 15,
        marginBottom: 15,
        fontWeight: "bold",
        borderBottomWidth: 1
    }
})