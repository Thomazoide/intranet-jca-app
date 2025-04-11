import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ValidateRequestForm from "@/components/ValidateRequestForm";
import { ACCOUNT_REQUEST_ENDPOINT, getToken, RequestSelection } from "@/constants/constants";
import { ResponsePayload } from "@/constants/responsePayloads";
import { AccountRequest } from "@/models/accountRequest.model";
import axios, { AxiosRequestConfig } from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, ScrollView, StyleSheet } from "react-native";
import { Circle } from "react-native-progress";

export default function Requests() {
    const [token, setToken] = useState<string | null>(null)
    const [requests, setRequests] = useState<AccountRequest[]>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedRequest, setSelectedRequest] = useState<RequestSelection>({
        ID: 0,
        showForm: false
    })

    const getRequests = async () => {
        setIsLoading(true)
        try{
            const bearerToken = `Bearer ${token!.trim()}`
            const CONFIG: AxiosRequestConfig = {
                headers: {
                    'Authorization':bearerToken,
                    'Content-Type': 'application/json',
                    'User-Agent': 'Expo'
                } 
            }
            const response = await axios.get(ACCOUNT_REQUEST_ENDPOINT, CONFIG)
            const data: ResponsePayload = response.data
            setRequests(data.data) 
        }catch(err){
            console.log(err)
        }finally{
            setIsLoading(false)
        }
    }

    const updateRequest = async () => {
        try{
            const CONFIG: AxiosRequestConfig = {
                headers: {
                    Authorization: `Bearer ${token?.trim()}`
                }
            }
            const response: ResponsePayload = (await axios.get(ACCOUNT_REQUEST_ENDPOINT, CONFIG)).data
            if(response.error){
                throw new Error(response.error)
            }
            console.log("updating...")
            setRequests(response.data)
        }catch{
            setRequests(requests)
        }
    }

    const ignoreRequest = async (request: AccountRequest) => {
        try{
            const response = await axios.put(ACCOUNT_REQUEST_ENDPOINT, request, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const data: ResponsePayload = response.data
            Alert.alert("Solicitud ignorada", data.message)
            getRequests()
        }catch{
            Alert.alert("Error", "No se pudo ignorar la solicitud")
        }
    }

    const obtainToken = async () => {
        const auxToken = await getToken(setToken)
        if (!auxToken) {
            router.replace("/(tabs)")
        }else{
            setToken(auxToken)
        }
    }

    useEffect( () => {
        if(!token) {
            obtainToken()
        }else if(!requests){
            getRequests()
        }
        if(requests){
            const interval = setInterval(updateRequest, 15000)
            return () => clearInterval(interval)
        }
    }, [token] )

    return (
        <ScrollView >
            {
                isLoading &&
                <ThemedView style={styles.container} >
                    <Circle indeterminate size={35} />
                </ThemedView>
            }
            {
                requests && token && !isLoading &&
                <ThemedView style={styles.container} >
                    {
                        requests.map((request, index) => (
                            <ThemedView key={index+1} style={!request.validated ? styles.requestCard : styles.ignoredRequestCard}>
                                <ThemedText style={styles.title}>
                                    Solicitud #{request.ID}
                                </ThemedText>
                                <ThemedText>
                                    Rut: {request.rut}
                                </ThemedText>
                                <ThemedText>
                                    Email: {request.email}
                                </ThemedText>
                                {
                                    !request.validated &&
                                    <ThemedView style={styles.buttonSection} >
                                        <Button title="Ignorar" color="#132237" onPress={ () => ignoreRequest(request)} />
                                        <Button title="validar" color="#132237" onPress={ () => setSelectedRequest({
                                            ID: request.ID,
                                            showForm: true
                                        }) }/>
                                    </ThemedView>
                                }
                                <ThemedView style={styles.formContainer} >
                                    {
                                        selectedRequest.ID === request.ID && selectedRequest.showForm &&
                                        <ValidateRequestForm accessToken={token} request={request} setShowForm={setSelectedRequest} getRequests={getRequests} />
                                    }
                                </ThemedView>
                            </ThemedView>
                        ))
                    }
                </ThemedView>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 55,
        gap: 10,
        width: '100%',
        height: '100%',
    },
    requestCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#132237',
        width: '90%',
        borderRadius: 20,
    },
    ignoredRequestCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#132237',
        width: '90%',
        borderRadius: 20,
        backgroundColor: '#d3d3d3',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        padding: 10,
    },
    formContainer: {
        display: 'flex',
        
    }
})