import { JCA_BLUE, JCA_YELLOW } from "@/constants/constants";
import { Liquidation } from "@/models/liquidation.model";
import { Button, GestureResponderEvent, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LiqRequester from "./liqRequester";

interface DRProps {
    liquidaciones: Array<Liquidation>
    setSelectedLiquidation: Dispatch<SetStateAction<Liquidation | null>>
    token: string
}

interface liqData {
    month: string
    year: string
    id: number
}

const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

export default function DocumentResumer(props: Readonly<DRProps>) {
    const [data, setData] = useState<Array<liqData>>()

    const sortData = () => {
        if(props.liquidaciones.length < 1){
            setData([])
            return
        }
        const auxData: Array<liqData> = []
        for(const liq of props.liquidaciones) {
            const path = liq.path.split("/")[3].split(".")[0]
            let month = path.split("_")[1]
            month = month[0] === "0" ? MONTHS[Number(month[1]) - 1] : MONTHS[Number(month)]
            const year = path.split("_")[2]
            const pushData: liqData = {
                month,
                year,
                id: liq.id
            }
            auxData.push(pushData)
        }
        setData(auxData)
    }

    const onSelect = (liqID: number) => {
        const liquidacion = props.liquidaciones.filter( (liq) => liq.id === liqID )[0]
        props.setSelectedLiquidation(liquidacion)
    }

    useEffect( () => {
        if(!data) sortData();
    }, [data] )

    return(
        data && data.length > 0 ?
        <ThemedView style={styles.documentResumer} >
            {
                data.map( (liq) => (
                    <ThemedView style={styles.docButton} key={liq.id} >
                        <ThemedText style={styles.whiteText}>
                            Liquidación
                        </ThemedText>
                        <ThemedText style={styles.whiteText}>
                            Año: {liq.year}
                        </ThemedText>
                        <ThemedText style={styles.whiteText}>
                            Mes: {liq.month}
                        </ThemedText>
                        <Button color={JCA_YELLOW} title={"Ver documento"} onPress={ () => onSelect(liq.id) }/>
                    </ThemedView>
                ) )
            }
            <LiqRequester token={props.token} />
        </ThemedView>
        :
        <ThemedView style={styles.documentResumer} >
            <ThemedText style={styles.errorText}>
                Usuario sin liquidaciones
            </ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    documentResumer: {
        padding: 12,
        backgroundColor: JCA_YELLOW,
        borderRadius: 25,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 12,
        height: "100%",
        width: "100%"
    },
    errorText: {
        color: "red"
    },
    docButton: {
        padding: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: JCA_BLUE,
        borderRadius: 25
    },
    whiteText: {
        color: "white"
    }
})