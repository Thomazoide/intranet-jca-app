import { HOLIDAYS_API_URL } from "@/constants/constants"
import { HolidaysApiResponse } from "@/constants/responsePayloads"
import { Holiday } from "@/models/holiday.model"
import axios from "axios"
import { useEffect, useState } from "react"
import { ThemedView } from "./ThemedView"
import { ThemedText } from "./ThemedText"
import { Button, ScrollView, StyleSheet } from "react-native"
import { CircleSnail } from 'react-native-progress'


export default function HolidaysTable(){
    const [holidays, setHolidays] = useState<Holiday[]>()
    const [fetchError, setFetchError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const tableHead = ["fecha", "título", "irrenunciable", "tipo"]

    const formatDate = (fecha: string): string => {
        const [year, month, day] = fecha.split("-")
        return `${day}/${month}/${year}`
    }

    const getHolidays = async () => {
        setIsLoading(true)
        try{
            const response: HolidaysApiResponse = (await axios.get(HOLIDAYS_API_URL)).data
            if(response.status !== "success"){
                throw new Error("Error al conseguir datos...")
            }
            setHolidays(response.data)
            setFetchError(null)
        }catch(err: any){
            const newError: Error = err
            setFetchError(newError)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect( () => {
        getHolidays()
    }, [] )

    return(
        <>
        {
            isLoading &&
            <ThemedView style={styles.container}>
                <ThemedText>Cargando...</ThemedText>
                <CircleSnail indeterminate size={35}/>
            </ThemedView>
        }
        {
            fetchError && !isLoading &&
            <ThemedView style={styles.container} >
                <ThemedText>
                    {fetchError.message}
                </ThemedText>
                <Button title="Reintentar" onPress={getHolidays}/>
            </ThemedView>
        }
        {
            holidays && !isLoading && !fetchError && 
            <ScrollView 
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContainerContent}
                horizontal
            >
                <ThemedView style={styles.table} >
                    <ThemedView style={[styles.row, styles.header]}>
                        {
                            tableHead.map( (header, index) => (
                                <ThemedText key={index+1} style={[
                                    styles.cell,
                                    styles.headerText
                                ]}>
                                    {header}
                                </ThemedText>
                            ) )
                        }
                    </ThemedView>
                    {
                        holidays.map( (feriado, index) => (
                            <ThemedView
                                key={index+1}
                                style={[
                                    styles.row,
                                    index % 2 === 0 ? styles.evenRow : styles.oddRow
                                ]}
                            >
                                <ThemedText style={styles.cell}>
                                    {formatDate(feriado.date)}
                                </ThemedText>
                                <ThemedText style={styles.cell}>
                                    {feriado.title}
                                </ThemedText>
                                <ThemedText style={styles.cell}>
                                    {feriado.inalienable ? "Si" : "No"}
                                </ThemedText>
                                <ThemedText style={styles.cell}>
                                    {feriado.type}
                                </ThemedText>
                            </ThemedView>
                        ) )
                    }
                </ThemedView>
            </ScrollView>
        }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        padding: 15,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    scrollContainer : {
        flex: 1,
        width: "100%"
    },
    scrollContainerContent: {
        paddingBottom: 20
    },
    table: {
        borderWidth: 1,
        borderColor: "#132237",
        width: "100%"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    header: {
        backgroundColor: "#f1f8ff"
    },
    evenRow: {
        backgroundColor: "#ffffff"
    },
    oddRow: {
        backgroundColor: "#f9f9f9"
    },
    cell: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: "#132237",
        textAlign: "center",
        width: 150,
        height: 100

    },
    headerText: {
        fontWeight: "bold"
    }
})