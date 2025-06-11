import DocumentResumer from "@/components/documentResumer";
import LiqRequester from "@/components/liqRequester";
import LiqVisor from "@/components/liqVisor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { GetRequestConfig, JCA_YELLOW, liquidationEndpoint } from "@/constants/constants";
import { ResponsePayload } from "@/constants/responsePayloads";
import { Liquidation } from "@/models/liquidation.model";
import { User } from "@/models/user.model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown"


export default function Liquidations() {
    const [liquidations, setLiquidations] = useState<Array<Liquidation>>()
    const [selectedLiquidation, setSelectedLiquidation] = useState<Liquidation | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [token, setToken] = useState<string>()
    const [userData, setUserData] = useState<User>()

    const getContracts = async () => {
        setIsLoading(true)
        const token = await AsyncStorage.getItem("token")
        if(token){
            const usrData = jwtDecode<User>(token)
            setToken(token)
            setUserData(usrData)
            const response = (await axios.get(liquidationEndpoint(usrData.id), GetRequestConfig(token))).data as ResponsePayload<Array<Liquidation>>
            if(response.error){
                setError(response.message)
                setIsLoading(false)
                return
            }
            if(response.data){
                setLiquidations(response.data)
                setError(null)
                setIsLoading(false)
                return
            }
        }
    }

    useEffect( () => {
        if(!liquidations) getContracts()
    }, [] )

    return(
        <ScrollView style={styles.fullBody} >
            <ThemedText>Liquidaciones</ThemedText>
            {
                liquidations && !selectedLiquidation &&
                <DocumentResumer liquidaciones={liquidations} setSelectedLiquidation={setSelectedLiquidation} token={token!} />
            }
            {
                selectedLiquidation &&
                <LiqVisor liq={selectedLiquidation} setLiq={setSelectedLiquidation} token={token!} userID={userData!.id} />
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    fullBody: {
        height: '100%',
        width: '100%',
        gap: 12,
        paddingTop: 45,
        paddingHorizontal: 5,
        paddingBottom: 25
    },
    docVisor: {
        display:"flex",
        width: 300,
        height: "80%",
        borderStyle: "solid",
        borderWidth: 5,
        borderRadius: 35,
        borderColor: JCA_YELLOW
    },
    
})