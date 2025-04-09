import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { Button, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown"


export default function Liquidations() {
    const [value, setValue] = useState<string | null>(null)
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const liquidations = [
        {
            label: "Enero",
            value: "1"
        },
        {
            label: "Febrero",
            value: "2"
        },
        {
            label: "Marzo",
            value: "3"
        },
        {
            label: "Abril",
            value: "4"
        },
        {
            label: "Mayo",
            value: "5"
        },
        {
            label: "Junio",
            value: "6"
        },
        {
            label: "Julio",
            value: "7"
        },
        {
            label: "Agosto",
            value: "8"
        },
        {
            label: "Septiembre",
            value: "9"
        },
        {
            label: "Octubre",
            value: "10"
        },
        {
            label: "Noviembre",
            value: "11"
        },
        {
            label: "Diciembre",
            value: "12"
        }
    ]

    

    return(
        <ThemedView style={styles.fullBody} >
            <ThemedText>Liquidaciones</ThemedText>
            <ThemedView>
                <ThemedText>Seleccionar mes</ThemedText>
                <Dropdown
                    data={liquidations}
                    labelField="label"
                    valueField="value"
                    placeholder="Mes"
                    itemTextStyle={{ color: 'blue' }}
                    selectedTextStyle={{ color: 'blue' }}
                    placeholderStyle={{ color: 'blue' }}
                    value={value}
                    onChange={
                        item => {
                            setValue(item.value)
                            setIsFocus(false)
                        }
                    }
                    onFocus={ () => setIsFocus(true) }
                    onBlur={ () => setIsFocus(false) }
                />
            </ThemedView>
            {
                value &&
                <>
                <ThemedView style={styles.docVisor}>

                </ThemedView>
                <Button title='Descargar liquidacion' />
                </>
            }
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    fullBody: {
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        paddingTop: 35,
    },
    docVisor: {
        display:"flex",
        width: 300,
        height: "80%",
        borderStyle: "solid",
        borderWidth: 5,
        borderRadius: 35,
        borderColor: "yellow"
    }
})