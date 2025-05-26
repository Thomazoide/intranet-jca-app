import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Contract, GetContractUploadEndpoint, getToken, RequestSelection, USERS_ENDPOINT } from "@/constants/constants";
import { ResponsePayload } from "@/constants/responsePayloads";
import { User } from "@/models/user.model";
import { ArrowCounterclockwise24Filled, ErrorCircle24Color } from "@fluentui/react-native-icons";
import axios, { AxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Circle } from "react-native-progress";
import * as DocumentPicker from 'expo-document-picker';
import RNFS from 'react-native-blob-util'
import { AddFileRequest } from "@/constants/requestsPayloads";
import ShowUserContract from "@/components/ShowUserContract";

export default function Contracts() {

    const [token, setToken] = useState<string | null>(null)
    const [userData, setUserData] = useState<User>()
    const [users, setUsers] = useState<User[]>()
    const [error, setError] = useState<Error | null>(null)
    const [uploadError, setUploadError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<RequestSelection>({
        ID: 0,
        showForm: false
    })
    
    const uploadContract = async (contract: Base64URLString, ID: number, fileName: string) => {
        const CONFIG: AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const ENDPOINT: string = GetContractUploadEndpoint(ID)
        const body: AddFileRequest = {
            file: contract,
            name: fileName
        }
        try{
            const response: ResponsePayload = (await axios.post(ENDPOINT, body, CONFIG)).data
            if(response.error){
                throw new Error(response.error)
            }
        }catch(err){
            console.log(err)
            setUploadError(err as Error)
        }
    }

    const selectPDF = async (ID: number) => {
        try{
            setIsLoading(true)
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
            })
            const asset: DocumentPicker.DocumentPickerAsset | null = result.assets![0]
            console.log(asset)
            if(asset != null){
                console.log("punto")
                const contract: Base64URLString = await RNFS.fs.readFile(asset.uri, 'base64')
                console.log(contract)
                await uploadContract(contract, ID, asset.name)
            }else{
                throw new Error("Error al subir contrato")
            }
        }catch(err){
            setUploadError(err as Error)
        }finally{
            await getUsers()
        }
    }

    const getUsers = async () => {
        const CONFIG: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        setIsLoading(false)
        const usrData: User = JSON.parse(jwtDecode(token!).sub!)
        setUserData(usrData)
        try{
            const response: ResponsePayload = await (await axios.get(USERS_ENDPOINT, CONFIG)).data
            if(response.error){
                throw new Error(response.error)
            }
            const aux: User[] = response.data
            setUsers(aux)
        }catch(err){
            setError(err as Error)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect( () => {
        if(!token){
            getToken(setToken)
        }
        if(token && !users){
            getUsers()
        }
    }, [token, users] ) 

    return (
        <ScrollView>
            {
                error &&
                <ThemedView style={styles.container} >
                    <ErrorCircle24Color/>
                    <ThemedText>
                        {error.message}
                    </ThemedText>
                    <ArrowCounterclockwise24Filled/>
                </ThemedView>
            }
            {
                isLoading &&
                <ThemedView style={styles.container}>
                    <ThemedText>Cargando...</ThemedText>
                    <Circle indeterminate />
                </ThemedView>
            }
            {
                users && userData && !isLoading &&
                <ThemedView style={styles.container} >
                    {
                        !users[0] ?
                        <ThemedView style={styles.errorCard} >
                            <ErrorCircle24Color/>
                            <ThemedText style={styles.title} >
                                Sin usuarios registrados...
                            </ThemedText>
                            <TouchableOpacity
                            style={styles.iconButton}
                            onPress={getUsers}
                            >
                                <ArrowCounterclockwise24Filled primaryFill="white" />
                                <ThemedText>Reintentar</ThemedText>
                            </TouchableOpacity>
                        </ThemedView>
                        :
                        users.map( (usr, index) => usr.ID !== userData.ID && (
                            <ThemedView key={index+1} style={styles.userCard} >
                                <ThemedText style={styles.title} >
                                    #{usr.ID} - {usr.nombre} {usr.apellido}
                                </ThemedText>
                                <ThemedText >
                                    {
                                        usr.contrato ?
                                        <ThemedView style={styles.buttonsFrame} >
                                            <Button title="Ver contrato" color="#132237" onPress={
                                                () => setSelectedUser({
                                                    ID: usr.ID,
                                                    showForm: !selectedUser.showForm
                                                })
                                            } />
                                            
                                            <Button title="Actualizar contrato" color="#132237" onPress={ () => selectPDF(usr.ID)} />
                                            {
                                                selectedUser.ID === usr.ID && selectedUser.showForm &&
                                                <ThemedView>
                                                    <ShowUserContract ID={usr.ID} token={token!}/>
                                                </ThemedView>
                                            }
                                        </ThemedView>
                                        :
                                        <ThemedView>
                                            <ThemedText style={{
                                                backgroundColor: "lightgrey",
                                                textAlign: "center"
                                            }} >
                                                Usuario sin contrato
                                            </ThemedText>
                                            <Button title="Actualizar contrato" color="#132237" onPress={ () => selectPDF(usr.ID)} />
                                        </ThemedView>
                                    }
                                </ThemedText>
                            </ThemedView>
                        ) )
                    }
                </ThemedView>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        paddingVertical: 40,
        gap: 5,
        width: "100%",
        height: "100%",
        padding: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    users_list: {
        display: "flex",
        padding: 15,
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center"
    },
    userCard: {
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "lightgray",
        width: "100%",
        padding: 15,
        gap: 5,
        borderStyle: "solid",
        borderColor: "yellow",
        borderWidth: 2,
        borderRadius: 15,
        maxHeight: '100%'
    },
    errorCard: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "lightgray",
        padding: 15,
        marginVertical: 25,
        gap: 5,
        borderStyle: "solid",
        borderColor: "red",
        borderWidth: 2,
        borderRadius: 15
    },
    title: {
        fontWeight: "bold",
        fontSize: 21
    },
    iconButton: {
        display: "flex",
        flexDirection: "row",
        width: 50,
        padding: 5,
        justifyContent: "center",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor:"yellow",
        backgroundColor: "#132237",
        borderRadius: 5
    },
    buttonsFrame: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        backgroundColor: 'lightgrey',
        alignItems: 'center'
    }
})