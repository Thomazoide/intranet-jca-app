import { ScrollView, StyleSheet, Switch, TextInput } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useState } from "react";

export default function KarinForm() {
    const [userIsVictim, setUserIsVictim] = useState<boolean>(false)
    const [isAcosoLaboral, setIsAcosoLaboral] = useState<boolean>(false)
    const [isAcosoSexual, setIsAcosoSexual] = useState<boolean>(false)
    const [isMaltratoLaboral, setIsMaltratoLaboral] = useState<boolean>(false)
    const [isAnotherType, setIsAnotherType] = useState<boolean>(false)
    const getActualDate = (): string => {
        const [year, month, day] = new Date().toISOString().split("T")[0].split("-")
        return `${day}/${month}/${year}`
    }

    return(
        <ScrollView >
            <ThemedView style={styles.formBody}>
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
                <ThemedView>
                    <ThemedText>
                        Unidad/Servicio/Area:
                    </ThemedText>
                    <TextInput style={styles.inputBox} />
                </ThemedView>
                <ThemedView style={styles.switchFrame}>
                    <ThemedText>
                        La persona que realiza la denuncia es la presunta victima de lo denunciado?
                    </ThemedText>
                    <Switch 
                        value={userIsVictim} 
                        trackColor={{
                            false: 'gray',
                            true: '#132237' 
                            }}
                        onValueChange={ () => setUserIsVictim(!userIsVictim) }
                        thumbColor={
                            userIsVictim ?
                            '#132237'
                            :
                            'white'
                        }
                        ios_backgroundColor={"gray"}
                    />
                </ThemedView>
                <ThemedView>
                    <ThemedText style={styles.subTitleFrame} >
                        Si la respuesta es NO, registrar al denunciante en los siguientes campos
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
                <ThemedView>
                    <ThemedText>
                        Unidad/Servicio/Area:
                    </ThemedText>
                    <TextInput style={styles.inputBox} />
                </ThemedView>
                <ThemedView>
                    <ThemedText style={styles.subTitleFrame} >
                        SITUACIONES QUE SE DENUNCIAN
                    </ThemedText>
                </ThemedView>
                <ThemedView style={styles.switchBetweenFrame}>
                    <ThemedText>
                        Acoso laboral
                    </ThemedText>
                    <Switch 
                        value={isAcosoLaboral} 
                        trackColor={{
                            false: 'gray',
                            true: '#132237' 
                            }}
                        onValueChange={ () => setIsAcosoLaboral(!isAcosoLaboral) }
                        thumbColor={
                            isAcosoLaboral ?
                            '#132237'
                            :
                            'white'
                        }
                        ios_backgroundColor={"gray"}
                    />
                </ThemedView>
                <ThemedView style={styles.switchBetweenFrame}>
                    <ThemedText>
                        Acoso sexual
                    </ThemedText>
                    <Switch 
                        value={isAcosoSexual} 
                        trackColor={{
                            false: 'gray',
                            true: '#132237' 
                            }}
                        onValueChange={ () => setIsAcosoSexual(!isAcosoSexual) }
                        thumbColor={
                            isAcosoSexual ?
                            '#132237'
                            :
                            'white'
                        }
                        ios_backgroundColor={"gray"}
                    />
                </ThemedView>
                <ThemedView style={styles.switchBetweenFrame}>
                    <ThemedText>
                        Maltrato laboral
                    </ThemedText>
                    <Switch 
                        value={isMaltratoLaboral} 
                        trackColor={{
                            false: 'gray',
                            true: '#132237' 
                            }}
                        onValueChange={ () => setIsMaltratoLaboral(!isMaltratoLaboral) }
                        thumbColor={
                            isMaltratoLaboral ?
                            '#132237'
                            :
                            'white'
                        }
                        ios_backgroundColor={"gray"}
                    />
                </ThemedView>
                <ThemedView style={styles.switchBetweenFrame}>
                    <ThemedText>
                        Otra situacion de violencia laboral
                    </ThemedText>
                    <Switch 
                        value={isAnotherType} 
                        trackColor={{
                            false: 'gray',
                            true: '#132237' 
                            }}
                        onValueChange={ () => setIsAnotherType(!isAnotherType) }
                        thumbColor={
                            isAnotherType ?
                            '#132237'
                            :
                            'white'
                        }
                        ios_backgroundColor={"gray"}
                    />
                </ThemedView>
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
        alignContent: "center",
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
        width: 200,
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
        margin: 5,
        textAlign: 'center',
    },
    switchFrame: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    switchBetweenFrame: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})