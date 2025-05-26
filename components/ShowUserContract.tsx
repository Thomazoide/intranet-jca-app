import { useEffect, useState } from "react"
import * as FileSystem from 'expo-file-system'
import axios, { AxiosRequestConfig } from "axios"
import { contractsEndpoint } from "@/constants/constants"
import { Button, StyleSheet } from "react-native"
import { ThemedView } from "./ThemedView"
import { ThemedText } from "./ThemedText"
import PDFReader from 'react-native-pdf'
import { Circle } from "react-native-progress"


interface SUCProps {
    token: string
    ID: number
}

export default function ShowUserContract(props: Readonly<SUCProps>){
    const [contract, setContract] = useState<string | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const arrayBufferToBase64 = (buffer: ArrayBuffer): Base64URLString => {
        let binary = ''
        const bytes = new Uint8Array(buffer)
        const len = bytes.length
        for(let x = 0; x < len; x++) {
            binary += String.fromCharCode(bytes[x])
        }
        return btoa(binary)
    }

    const savePDFToFile = async (base64: Base64URLString): Promise<string> => {
        const fileURI = `${FileSystem.documentDirectory}contract.pdf`
        await FileSystem.writeAsStringAsync(fileURI, base64, {
            encoding: FileSystem.EncodingType.Base64
        })
        return fileURI
    }

    const getContract = async () => {
        const ENDPOINT: string = contractsEndpoint(props.ID)
        const CONFIG: AxiosRequestConfig = {
            responseType: "arraybuffer",
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }
        setIsLoading(true)
        try{
            const buffer: ArrayBuffer = (await axios.get(ENDPOINT, CONFIG)).data
            const base64Data: Base64URLString = arrayBufferToBase64(buffer)
            const dataURI = await savePDFToFile(base64Data)
            setError(null)
            setContract(dataURI)
        }catch(err){
            console.log(err)
            setError(err as Error)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect( () => {
        getContract()
    }, [] )

    return(
        <ThemedView style={styles.container}>
            {
                !isLoading && error ?
                <>
                <ThemedText>Contrato no encontrado en base de datos</ThemedText>
                <Button title="reintentar" onPress={getContract}/>
                </>
                :
                !isLoading && contract ?
                <ThemedView style={styles.innerContainer}>
                    <PDFReader
                    source={{uri: contract}}
                    style={styles.pdf}
                    />
                </ThemedView>
                :
                <ThemedView style={styles.innerContainer}>
                    <Circle size={50} indeterminate/>
                </ThemedView>
            }
        </ThemedView>
    )

}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "80%",
        width: "80%",
        overflowY: "scroll",
        backgroundColor: 'lightgrey'
    },
    innerContainer: {
        width: '100%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: 'center',
        alignItems: "center",
        backgroundColor: 'lightgrey',
        padding: 10,
        gap: 5
    },
    pdf: {
        display:"flex",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 300,
        height: 500,
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 35,
        borderColor: "yellow",
        
    }
})