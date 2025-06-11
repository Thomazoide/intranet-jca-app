import { Liquidation } from "@/models/liquidation.model";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ThemedView } from "./ThemedView";
import { Button, StyleSheet } from "react-native";
import { Base64LiquidationURL, GetRequestConfig, JCA_BLUE, JCA_YELLOW } from "@/constants/constants";
import PDFReader from "react-native-pdf"
import axios from "axios";
import { ResponsePayload } from "@/constants/responsePayloads";
import { Circle } from "react-native-progress";

interface LVprops {
    userID: number
    liq: Liquidation
    setLiq: Dispatch<SetStateAction<Liquidation | null>>
    token: string
}

export default function LiqVisor(props: Readonly<LVprops>) {

    const [URI, setURI] = useState<string>()

    const getDocument = async () => {
        const response = (await axios.get(await Base64LiquidationURL(props.userID, props.liq.id), GetRequestConfig(props.token))).data as ResponsePayload<{base64: string}>
        if(response.data){
            setURI(`data:application/pdf;base64,${response.data.base64}`)
        }
    }

    const onReturn = () => {
        props.setLiq(null)
    }

    useEffect( () => {
        if(!URI) getDocument();
    }, [URI] )

    return(
        URI ?
        <ThemedView style={styles.documentResumer} >
            <ThemedView style={styles.returnButtonSection}>
                <Button color={JCA_BLUE} title="Volver" onPress={onReturn} />
            </ThemedView>
            <PDFReader
            source={{uri: URI}}
            style={styles.pdf}
            />
        </ThemedView>
        :
        <ThemedView style={styles.documentResumer}>
            <Circle borderWidth={5} size={50} indeterminate color={JCA_BLUE}/>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    documentResumer: {
        padding: 12,
        backgroundColor: JCA_YELLOW,
        borderRadius: 25,
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        gap: 12,
        height: "100%",
        width: "100%"
    },
    returnButtonSection: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-start",
        backgroundColor: JCA_YELLOW
    },
    pdf: {
        display: "flex",
        width: 300,
        height: 500,
        borderStyle: "solid",
        borderWidth: 3,
        borderRadius: 35,
        borderColor: JCA_BLUE
    }
})