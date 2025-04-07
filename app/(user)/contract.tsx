import { ThemedView } from "@/components/ThemedView";
import { contractsEndpoint, decodeToken, getToken } from "@/constants/constants";
import { User } from "@/models/user.model";
import { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import axios from "axios";
import { Circle } from "react-native-progress";
import * as FileSystem from "expo-file-system"
import PDFReader from "react-native-pdf"


export default function ContractView() {
    const [userData, setUserData] = useState<User>()
    const [userToken, setUserToken] = useState<string | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [contract, setContract] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [cantidadPaginas, setCantidadPaginas] = useState<number>()
    const [paginaActual, setPaginaActual] = useState<number>()

    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
        let binary: string = ''
        const bytes = new Uint8Array(buffer)
        const len = bytes.length
        for(let x = 0; x < len; x++) {
            binary += String.fromCharCode(bytes[x])
        }
        return btoa(binary)
    }

    const savePDFToFile = async (base64: string): Promise<string> => {
        const fileURI = `${FileSystem.documentDirectory}contract.pdf`
        await FileSystem.writeAsStringAsync(fileURI, base64, {
            encoding: FileSystem.EncodingType.Base64
        })
        return fileURI
    }

    const getContract = async () => {
        if (userData && userToken) {
            setIsLoading(true)
            console.log(userToken)
            try{
                const response = await axios.get(contractsEndpoint(userData.ID), {
                    responseType: "arraybuffer",
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                const base64Data: string = arrayBufferToBase64(response.data)
                const dataURI = await savePDFToFile(base64Data)
                console.log(dataURI)
                setError(null)
                setContract(dataURI)
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
                    <ThemedText>
                        Contrato {`${userData.nombre} ${userData.apellido}`}
                    </ThemedText>
                    <ThemedView>
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
                    </ThemedView>
                    <Button color={"#132237"} title="Descargar"/>
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
        overflowY: "scroll"
    },
    innerContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 5
    },
    pdf: {
        display:"flex",
        width: 300,
        height: "80%",
        borderStyle: "solid",
        borderWidth: 5,
        borderRadius: 35,
        borderColor: "yellow"
        
    }
})