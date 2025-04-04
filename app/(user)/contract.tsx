import { ThemedView } from "@/components/ThemedView";
import { contractsEndpoint, decodeToken, getToken } from "@/constants/constants";
import { User } from "@/models/user.model";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import axios from "axios";
import { CircleSnail } from "react-native-progress";
import PDFReader from "react-native-pdf"


export default function ContractView() {
    const [userData, setUserData] = useState<User>()
    const [userToken, setUserToken] = useState<string | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [contract, setContract] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const blobToDataURI = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => {
                resolve(reader.result as string)
            }
            reader.onerror = reject
            reader.readAsDataURL(blob)
        })
    }

    const getContract = async () => {
        if (userData && userToken) {
            try{
                const response = await axios.get(contractsEndpoint(userData.ID), {
                    responseType: "arraybuffer",
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                const data: string = await blobToDataURI(new Blob([response.data], {type: "application/pdf"}))
                console.log(data)
                setContract(data)
            }catch(err: any){
                const newError: Error = err
                console.log(newError.message)
                setError(newError)
            }
        }
    }

    useEffect(() => {
        if(!userData && !userToken){
            setIsLoading(true)
            decodeToken(setUserData, setError)
            getToken().then(token => {
                setUserToken(token)
            }
            ).catch(err => {
                const newError: Error = err
                setError(newError)
                setIsLoading(false)
            })
        }
        if(userData && userToken && !contract){
            getContract()
            setIsLoading(false)
        }
    }, [userData, userToken])

    return (
        <ThemedView style={styles.container}>
            {
                isLoading &&
                <CircleSnail animated size={15} />
            }
            {
                error ?
                <ThemedText>Contrato no encontrado en base de datos</ThemedText>
                :
                contract && userData &&
                <>
                <ThemedView style={styles.innerContainer}>
                    <PDFReader
                    source={{uri: contract}}
                    style={styles.pdf}
                    />
                </ThemedView>
                </>
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
    },
    innerContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        gap: 10
    },
    pdf: {
        flex: 1,
        width: "100%",
        height: "100%",
    }
})