import { ThemedView } from "@/components/ThemedView";
import { contractsEndpoint, decodeToken, getToken } from "@/constants/constants";
import { User } from "@/models/user.model";
import { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import axios from "axios";
import "@react-pdf-viewer/core/lib/styles/index.css";

let Pdf: any;
let RNFS: any;
if (Platform.OS !== "web") {
    Pdf = require("react-native-pdf").default;
    RNFS = require("react-native-fs");
}

export default function ContractView() {
    const [userData, setUserData] = useState<User>()
    const [userToken, setUserToken] = useState<string | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [pdfPath, setPdfPath] = useState<string | Blob | null>(null)
    const [contract, setContract] = useState<any>(null)
    const isNotWeb = Platform.OS !== "web"

    const getContract = async () => {
        if (userData && userToken) {
            try{
                const response = await axios.get(contractsEndpoint(userData.ID), {
                    responseType: "arraybuffer",
                    withCredentials: true,        
                })
                const data = response.data
                const path = isNotWeb ? `${RNFS.DocumentDirectoryPath}/contrato.pdf` : new Blob([data], { type: 'application/pdf' })
                isNotWeb && await RNFS.writeFile(path, data, 'base64')
                console.log(data)
                setPdfPath(isNotWeb ? path : URL.createObjectURL((path) as Blob))
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
            decodeToken(setUserData, setError)
            getToken().then(token => {
                setUserToken(token)
            }
            ).catch(err => {
                const newError: Error = err
                setError(newError)
            })
        }
        if(userData && userToken && !contract){
            getContract()
        }
    }, [userData, userToken])

    return (
        <ThemedView style={styles.container}>
            {
                error ?
                <ThemedText>Contrato no encontrado en base de datos</ThemedText>
                :
                contract && userData &&
                <>
                <ThemedView style={styles.innerContainer}>
                    <ThemedText>Contrato de {userData.nombre}</ThemedText>
                    { isNotWeb ?( 
                    pdfPath ?
                    <Pdf 
                        source={{uri: `file://${pdfPath}`, cache: true}}
                        style={styles.pdf}
                        onError={
                            (error: any) => {
                                console.log(error)
                                const newError: Error = new Error("Error al cargar el PDF")
                                setError(newError)
                            }
                        }
                    />
                    :
                    <ThemedText>Cargando...</ThemedText>
                    )
                    :
                    pdfPath &&
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={(pdfPath) as string} />
                    </Worker>
                    }
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