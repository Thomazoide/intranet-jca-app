import { Dropdown } from "react-native-element-dropdown";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useState } from "react";
import { Button, StyleSheet } from "react-native";
import { GetRequestConfig, JCA_BLUE, SolicitarLiquidacionesURL } from "@/constants/constants";
import { jwtDecode } from "jwt-decode";
import { User } from "@/models/user.model";
import axios from "axios";
import { ResponsePayload } from "@/constants/responsePayloads";
import { LiqRequest } from "@/models/liqRequest.model";
import ErrorOrSuccessMessage from "./ErrorOrSuccessMessage";
import { Circle } from "react-native-progress";

const LISTA_LIQ_MAX: Array<{label: string, value: number}> = [
    {
        label: "Seleccionar cantidad",
        value: 0
    },
    {
        label: "La más reciente",
        value: 1
    },
    {
        label: "Últimas 2",
        value: 2
    },
    {
        label: "Últimas 3",
        value: 3
    },
    {
        label: "Últimas 4",
        value: 4
    },
    {
        label: "Últimas 5",
        value: 5
    },
    {
        label: "Últimas 6",
        value: 6
    },
    {
        label: "Últimas 7",
        value: 7
    },
    {
        label: "Últimas 8",
        value: 8
    },
    {
        label: "Últimas 9",
        value: 9
    },
    {
        label: "Últimas 10",
        value: 10
    },
    {
        label: "Últimas 11",
        value: 11
    },
    {
        label: "Últimas 12",
        value: 12
    }
]

export default function LiqRequester(props: Readonly<{token: string}>) {

    const [selectedQ, setSelectedQ] = useState<number>(0)
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const sendLiqRequest = async () => {
        setIsLoading(true)
        const config = GetRequestConfig(props.token)
        const userID = jwtDecode<User>(props.token).id
        const url = SolicitarLiquidacionesURL(userID)
        const payload: Partial<LiqRequest> = {
            message: LISTA_LIQ_MAX[selectedQ].label,
            userID,
            completada: false
        }
        const response = (await axios.put(url, payload, config)).data as ResponsePayload<LiqRequest>
        console.log(response)
        if(response.error){
            setError(new Error(response.message))
            setIsSuccess(false)
            setIsLoading(false)
            return
        }
        setIsSuccess(true)
        setError(null)
        setIsLoading(false)
    }

    return(
        <ThemedView style={styles.requesterBody} >
            <ThemedText style={styles.containerTitle} >Solicitar liquidaciones</ThemedText>
            <Dropdown
            data={LISTA_LIQ_MAX}
            labelField="label"
            valueField="value"
            placeholder="Seleccionar cantidad"
            value={selectedQ}
            onChange={
                (item: {label: string, value: number}) => {
                    setSelectedQ(item.value)
                    console.log(item)
                }
            }
            style={styles.dropdownStyle}
            selectedTextStyle={{
                color: "white"
            }}
            />
            {
                selectedQ !== 0 &&
                <Button color={JCA_BLUE} title="Solicitar" onPress={sendLiqRequest} disabled={isLoading} />
            }
            {
                isLoading &&
                <Circle indeterminate size={15} color={JCA_BLUE}/>
            }
            {
                error &&
                <ErrorOrSuccessMessage message={error.message} isError={true}/>
            }
            {
                isSuccess && error === null &&
                <ErrorOrSuccessMessage message="Solicitud creada" isError={false}/>
            }
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    requesterBody: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#D69E2E",
        borderRadius: 15,
        padding: 12,
    },
    itemContainer: {
        width: "100%"
    },
    containerTitle: {
        borderStyle: "dashed",
        borderBottomWidth: 2,
        borderBottomColor: "black"
    },
    dropdownStyle: {
        backgroundColor: JCA_BLUE,
        padding: 12,
        borderRadius: 15,
        color: "white"
    }
})