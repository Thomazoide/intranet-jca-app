import { ScrollView, StyleSheet, TextInput } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function KarinForm() {

    const getActualDate = (): string => {
        const [year, month, day] = new Date().toISOString().split("T")[0].split("-")
        return `${day}/${month}/${year}`
    }

    return(
        <ScrollView>
            <ThemedView>
                <ThemedText style={styles.titleFrame}> 
                    ACTA DE DENUNCIA DE ACOSO LABORAL, ACOSO SEXUAL O MALTRATO LABORAL.
                </ThemedText>
                <ThemedText style={styles.subTitleFrame} >
                    DATOS DE EL/LA DENUNCIANTE
                </ThemedText>
            </ThemedView>
            <ThemedView>
                <ThemedText>
                    Fecha: {getActualDate()}
                </ThemedText>
            </ThemedView>
            <ThemedView>
                <ThemedText>
                    Nombres y apellidos:
                </ThemedText>
                <TextInput style={styles.inputBox} />
            </ThemedView>
            <ThemedView>
                <ThemedText>
                    Rut:
                </ThemedText>
                <TextInput style={styles.inputBox} />
            </ThemedView>
            <ThemedView>
                <ThemedText>
                    Medio de contacto:
                </ThemedText>
                <TextInput style={styles.inputBox} />
            </ThemedView>
            <ThemedView>
                <ThemedText>
                    Cargo:
                </ThemedText>
                <TextInput style={styles.inputBox} />
            </ThemedView>
            <ThemedView>
                <ThemedText>
                    Unidad/Servicio/Area:
                </ThemedText>
                <TextInput style={styles.inputBox} />
            </ThemedView>
            <ThemedView>
                <ThemedText style={ styles.subTitleFrame } >
                    DATOS DEL DENUNCIADO/A
                </ThemedText>
            </ThemedView>
            <ThemedView>
                <ThemedText>
                    Nombres y apellidos:
                </ThemedText>
                <TextInput style={styles.inputBox} />
            </ThemedView>
            <ThemedView>
                <ThemedText>
                    Cargo:
                </ThemedText>
                <TextInput style={styles.inputBox} />
            </ThemedView>
            <ThemedView>
                <ThemedText>
                    Rut:
                </ThemedText>
                <TextInput style={styles.inputBox} />
            </ThemedView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formBody: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    inputFrame: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    inputBox: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    titleFrame: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'black',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 2,
        margin: 5
    },
    subTitleFrame: {
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: 'black',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 2,
        margin: 5
    }
})