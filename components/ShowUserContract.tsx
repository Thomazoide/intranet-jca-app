import { useEffect, useState } from "react"
import axios, { AxiosRequestConfig } from "axios"
import { contractsEndpoint } from "@/constants/constants"
import { Button, StyleSheet } from "react-native"
import { ThemedView } from "./ThemedView"
import { ThemedText } from "./ThemedText"
import PDFReader from 'react-native-pdf'
import { Circle } from "react-native-progress"
import { base64File, ResponsePayload } from "@/constants/responsePayloads"


interface SUCProps {
    token: string
    id: number
}

export default function ShowUserContract(props: Readonly<SUCProps>){
    const [contract, setContract] = useState<string | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getContract = async () => {
        const ENDPOINT: string = contractsEndpoint(props.id)
        const CONFIG: AxiosRequestConfig = {
            responseType: "arraybuffer",
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }
        setIsLoading(true)
        setError(null)
        setContract(null)
        try{
            const response = (await axios.get(ENDPOINT, CONFIG)).data as ResponsePayload<base64File>
            if (response.error) throw new Error(response.message);
            const pdfURI = `data:application/pdf;base64,${response.data?.base64}`
            setContract(pdfURI)
        }catch(err){
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