import { ThemedView } from "@/components/ThemedView";
import { Base64ContractURL, decodeToken, GetRequestConfig, getToken, JCA_BLUE, JCA_YELLOW } from "@/constants/constants";
import { User } from "@/models/user.model";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import axios from "axios";
import { Circle } from "react-native-progress";
import PDFReader from "react-native-pdf"
import { ResponsePayload } from "@/constants/responsePayloads";


export default function ContractView() {
    const [userData, setUserData] = useState<User>()
    const [userToken, setUserToken] = useState<string | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [contract, setContract] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [cantidadPaginas, setCantidadPaginas] = useState<number>()
    const [paginaActual, setPaginaActual] = useState<number>()

    const getContract = async () => {
        if (userData && userToken) {
            setIsLoading(true)
            console.log(userToken)
            try{
                const response = (await axios.get(await Base64ContractURL(userData.id), GetRequestConfig(userToken))).data as ResponsePayload<{base64: string}>
                const base64Data = response.data?.base64
                console.log(base64Data)
                setError(null)
                setContract(`data:application/pdf;base64,${base64Data}`)
            }catch(err: any){
                const newError: Error = err
                console.log(newError.message)
                setError(newError)
            }finally{
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        if(!userData && !userToken){
            decodeToken(setUserData, setError)
            getToken(setUserToken)
        }
        if(userData && userToken && !contract){
            getContract()
        }
    }, [userData, userToken])

    return (
        <ThemedView style={styles.container}>
            {
                !isLoading && error ?
                <>
                <ThemedText>Contrato no encontrado en base de datos</ThemedText>
                <Button title="reintentar" onPress={getContract}/>
                </>
                :
                !isLoading && contract && userData ?
                <ThemedView style={styles.innerContainer}>
                    <ThemedText style={styles.text}>
                        Contrato {`${userData.fullName}`}
                    </ThemedText>
                        <PDFReader
                        source={{uri: contract}}
                        style={styles.pdf}
                        onLoadComplete={
                            (numberOfPages, _path) => {
                                setCantidadPaginas(numberOfPages)
                            }
                        }
                        onPageChanged={ (actualPage, _numberOfPages) => {
                            setPaginaActual(actualPage)
                        } }
                        />
                    <Button color={JCA_YELLOW} title="Descargar"/>
                    {
                        paginaActual && cantidadPaginas &&
                        <ThemedText>
                            Página: {paginaActual}/{cantidadPaginas}
                        </ThemedText>
                    }
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
        height: "100%",
        width: "100%",
        overflowY: "scroll",
        backgroundColor: JCA_BLUE,
    },
    innerContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 5,
        backgroundColor: JCA_BLUE
    },
    pdf: {
        display:"flex",
        width: 300,
        height: "80%",
        borderStyle: "solid",
        borderWidth: 5,
        borderRadius: 35,
        borderColor: JCA_YELLOW
        
    },
    text: {
        color: "white"
    }
})