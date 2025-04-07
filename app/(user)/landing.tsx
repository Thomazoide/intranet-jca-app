import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { User } from "@/models/user.model";
import { CircleSnail } from 'react-native-progress'
import { checkToken } from "@/utils/funcs";
import { decodeToken } from "@/constants/constants";
import axios, { AxiosResponse } from "axios";
import { CurrencyResponse } from "@/models/currencyModel";

export default function LandingScreen() {
    const [userData, setUserData] = useState<User>()
    const [error, setError] = useState<Error | null>(null)
    const [dolarString, setDolarString] = useState<string>()
    const [euroString, setEuroString] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function formatDate(isoDate: string): string {
        const date = new Date(isoDate)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
    }

    const DOLAR_API = "https://cl.dolarapi.com/v1/cotizaciones/usd"
    const EURO_API = "https://cl.dolarapi.com/v1/cotizaciones/eur"

    type CurrencyType = "usd" | "eur"

    async function getCurrencyPrice(type: CurrencyType): Promise<void> {
        setIsLoading(true)
        let fullStr = ''
        axios.get(type === "usd" ? DOLAR_API : EURO_API)
            .then( (res: AxiosResponse<CurrencyResponse, any>) => {
                console.log(res.data)
                const crr = res.data
                fullStr = `${crr.moneda}: ${crr.compra} CLP\nActualizado el: ${formatDate(crr.fechaActualizacion)}`
                type === "usd" ? setDolarString(fullStr) : setEuroString(fullStr)
            } )
            .catch( (err: Error) => {
                console.log(err)
                setError(err)
                fullStr = ''
            } )
            .finally( () => {
                setIsLoading(false)
            } )
    }

    useEffect(() => {
        getCurrencyPrice("usd")
        getCurrencyPrice("eur")
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
                isLoading ?
                <ThemedView style={styles.menu}>
                    <ThemedText>Cargando...</ThemedText>
                    <CircleSnail size={100} indeterminate={true} />
                </ThemedView>
                :
                userData && dolarString && euroString && !error ?
                <ThemedView style={styles.menu}>
                    <ThemedText>Bienvenido/a {userData.nombre}!</ThemedText>
                    <ThemedView style={styles.dashboardGrid}>
                        <ThemedView style={styles.gridElement}>
                            <ThemedText>
                                {dolarString}
                            </ThemedText>
                        </ThemedView>
                        <ThemedView style={styles.gridElement}>
                            <ThemedText>
                                {euroString}
                            </ThemedText>
                        </ThemedView>
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
        borderRadius: 25,
        width: 130,
        textAlign: 'center',
        alignContent: 'center',
        
    }
})