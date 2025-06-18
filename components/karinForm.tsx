import { Dimensions, ScrollView, StyleSheet, Switch, TextInput } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useState } from "react";
import { JCA_BLUE, JCA_YELLOW } from "@/constants/constants";
import { Dropdown } from "react-native-element-dropdown";
import { LineHorizontal124Regular } from "@fluentui/react-native-icons";

interface WitnessData {
    nombre: string
    cargo: string
    //Unidad/Area/Servicio
    uas: string
}

const cant_testigos = [
    {
        label: "Sin testigos",
        value: 0
    },
    {
        label: "1 testigo",
        value: 1
    },
    {
        label: "2 testigos",
        value: 2
    },
    {
        label: "3 testigos",
        value: 3
    },
    {
        label: "4 testigos",
        value: 4
    },
    {
        label: "5 testigos",
        value: 5
    }
]

export default function KarinForm() {
    
    const [userIsVictim, setUserIsVictim] = useState<boolean>(false)
    const [isAcosoLaboral, setIsAcosoLaboral] = useState<boolean>(false)
    const [isAcosoSexual, setIsAcosoSexual] = useState<boolean>(false)
    const [isMaltratoLaboral, setIsMaltratoLaboral] = useState<boolean>(false)
    const [isAnotherType, setIsAnotherType] = useState<boolean>(false)
    //Relacion Asimetrica en que la Victima Depende del/la Denunciado/a
    const [RAVDD, setRAVDD] = useState<boolean>(false)
    //Realción Asimetrica en la que el Denunciado Depende de la Victima
    const [RADDV, setRADDV] = useState<boolean>(false)
    //Relación Simetrica en la que el Denunciado y la Victima No Dependen entre ellos pero se desempeñan en la misma Unidad
    const [RSDVNDU, setRSDVNDU] = useState<boolean>(false)
    //Relación Simetrica en la que el Denunciado y la Victima No Dependen entre ellos y No se desempeñan en la misma Unidad
    const [RSDVNDNU, setRSDVNDNU] = useState<boolean>(false)
    const [existeEvidencia, setExisteEvidencia] = useState<boolean>(false)
    //Se Conoce de Otros Antecedentes de Indole Similar
    const [SCOAIS, setSCOAIS] = useState<boolean>(false)
    //Situacion Denunciada Previamente en otra Instancia Similar
    const [SDPIS, setSDPIS] = useState<boolean>(false)
    const [cantidadDeTestigos, setCantidadDeTestigos] = useState<number>(0)

    //Datos del/la denunciante
    const [fullName, setFullName] = useState<string>()
    const [rut, setRut] = useState<string>()
    const [medioContanto, setMedioContacto] = useState<string>()
    const [cargo, setCargo] = useState<string>()
    //Unidad/servicio/cargo
    const [usa, setUsa] = useState<string>()

    //Datos del/la denunciado/a
    const [dFullName, setDFullName] = useState<string>()
    const [dRut, setDRut] = useState<string>()
    const [dCargo, setDCargo] = useState<string>()
    const [dUsa, setDUsa] = useState<string>()

    //Datos de la victima (En caso de que el denunciante no lo sea)
    const [vFullName, setVFullName] = useState<string>()
    const [vRut, setVRut] = useState<string>()
    const [vCargo, setVCargo] = useState<string>()
    const [vUsa, setVUsa] = useState<string>()

    //Testigos
    



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
                    <TextInput style={styles.inputBox} onChangeText={setFullName} />
                </ThemedView>
                <ThemedView>
                    <ThemedText>
                        Rut:
                    </ThemedText>
                    <TextInput style={styles.inputBox} onChangeText={setRut} />
                </ThemedView>
                <ThemedView>
                    <ThemedText>
                        Medio de contacto:
                    </ThemedText>
                    <TextInput style={styles.inputBox} onChangeText={setMedioContacto} />
                </ThemedView>
                <ThemedView>
                    <ThemedText>
                        Cargo:
                    </ThemedText>
                    <TextInput style={styles.inputBox} onChangeText={setCargo}/>
                </ThemedView>
                <ThemedView>
                    <ThemedText>
                        Unidad/Servicio/Area:
                    </ThemedText>
                    <TextInput style={styles.inputBox} onChangeText={setUsa} />
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
                    <TextInput style={styles.inputBox} onChangeText={setDFullName} />
                </ThemedView>
                <ThemedView>
                    <ThemedText>
                        Cargo:
                    </ThemedText>
                    <TextInput style={styles.inputBox} onChangeText={setDCargo} />
                </ThemedView>
                <ThemedView>
                    <ThemedText>
                        Rut:
                    </ThemedText>
                    <TextInput style={styles.inputBox} onChangeText={setDRut} />
                </ThemedView>
                <ThemedView>
                    <ThemedText>
                        Unidad/Servicio/Area:
                    </ThemedText>
                    <TextInput style={styles.inputBox} onChangeText={setDUsa} />
                </ThemedView>
                <ThemedView style={styles.switchFrame}>
                    <ThemedText>
                        La persona que realiza la denuncia es la presunta victima de lo denunciado?
                    </ThemedText>
                    <Switch 
                        value={userIsVictim} 
                        trackColor={{
                            false: 'gray',
                            true: JCA_BLUE
                            }}
                        onValueChange={ () => setUserIsVictim(!userIsVictim) }
                        thumbColor={
                            userIsVictim ?
                            JCA_YELLOW
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
                    <TextInput style={styles.inputBox} onChangeText={setVFullName} />
                </ThemedView>
                <ThemedView>
                    <ThemedText>
                        Cargo:
                    </ThemedText>
                    <TextInput style={styles.inputBox} onChangeText={setVCargo}/>
                </ThemedView>
                <ThemedView>
                    <ThemedText>
                        Rut:
                    </ThemedText>
                    <TextInput style={styles.inputBox} onChangeText={setVRut} />
                </ThemedView>
                <ThemedView>
                    <ThemedText>
                        Unidad/Servicio/Area:
                    </ThemedText>
                    <TextInput style={styles.inputBox} onChangeText={setVUsa} />
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
                            true: JCA_BLUE 
                            }}
                        onValueChange={ () => setIsAcosoLaboral(!isAcosoLaboral) }
                        thumbColor={
                            isAcosoLaboral ?
                            JCA_YELLOW
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
                            true: JCA_BLUE 
                            }}
                        onValueChange={ () => setIsAcosoSexual(!isAcosoSexual) }
                        thumbColor={
                            isAcosoSexual ?
                            JCA_YELLOW
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
                            true: JCA_BLUE 
                            }}
                        onValueChange={ () => setIsMaltratoLaboral(!isMaltratoLaboral) }
                        thumbColor={
                            isMaltratoLaboral ?
                            JCA_YELLOW
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
                            true: JCA_BLUE 
                            }}
                        onValueChange={ () => setIsAnotherType(!isAnotherType) }
                        thumbColor={
                            isAnotherType ?
                            JCA_YELLOW
                            :
                            'white'
                        }
                        ios_backgroundColor={"gray"}
                    />
                </ThemedView>
                <ThemedView>
                    <ThemedText style={styles.subTitleFrame} >
                        SOBRE LA RELACIÓN ENTRE VÍCTIMA Y DENUNCIADO/A
                    </ThemedText>
                </ThemedView>
                <ThemedView style={styles.switchBetweenFrame}>
                    <ThemedText style={{
                        maxWidth: "75%"
                    }} >
                        Existe una relación asimétrica en que la víctima tiene dependencia directa o indirecta de el/la denunciado/a.
                    </ThemedText>
                    <Switch 
                        value={RAVDD} 
                        trackColor={{
                            false: 'gray',
                            true: JCA_BLUE 
                            }}
                        onValueChange={ () => setRAVDD(!RAVDD) }
                        thumbColor={
                            RAVDD ?
                            JCA_YELLOW
                            :
                            'white'
                        }
                        ios_backgroundColor={"gray"}
                    />
                </ThemedView>
                <ThemedView style={styles.switchBetweenFrame}>
                    <ThemedText style={{
                        maxWidth: "75%"
                    }} >
                        Existe una relación asimétrica en que el/la denunciado/a tiene dependencia directa o indirecta de la víctima. 
                    </ThemedText>
                    <Switch 
                        value={RADDV} 
                        trackColor={{
                            false: 'gray',
                            true: JCA_BLUE 
                            }}
                        onValueChange={ () => setRADDV(!RADDV) }
                        thumbColor={
                            RADDV ?
                            JCA_YELLOW
                            :
                            'white'
                        }
                        ios_backgroundColor={"gray"}
                    />
                </ThemedView>
                <ThemedView style={styles.switchBetweenFrame}>
                    <ThemedText style={{
                        maxWidth: "75%"
                    }}>
                        Existe una relación simétrica en que el/la denunciado/a y la víctima no tienen una dependencia directa ni indirecta, pero se desempeñan en la misma área/unidad/servicio. 
                    </ThemedText>
                    <Switch 
                        value={RSDVNDU} 
                        trackColor={{
                            false: 'gray',
                            true: JCA_BLUE 
                            }}
                        onValueChange={ () => setRSDVNDU(!RSDVNDU) }
                        thumbColor={
                            RSDVNDU ?
                            JCA_YELLOW
                            :
                            'white'
                        }
                        ios_backgroundColor={"gray"}
                    />
                </ThemedView>
                <ThemedView style={styles.switchBetweenFrame}>
                    <ThemedText style={{
                        maxWidth: "75%"
                    }}>
                        Existe una relación simétrica en que el/la denunciado/a y la víctima no tienen una dependencia directa ni indirecta, y no se desempeñan en la misma área/unidad/servicio. 
                    </ThemedText>
                    <Switch 
                        value={RSDVNDNU} 
                        trackColor={{
                            false: 'gray',
                            true: JCA_BLUE 
                            }}
                        onValueChange={ () => setRSDVNDNU(!RSDVNDNU) }
                        thumbColor={
                            RSDVNDNU ?
                            JCA_YELLOW
                            :
                            'white'
                        }
                        ios_backgroundColor={"gray"}
                    />
                </ThemedView>
                <ThemedView>
                    <ThemedText style={styles.subTitleFrame} >
                        SOBRE LAS PRESUNTAS SITUACIONES DENUNCIADAS
                    </ThemedText>
                </ThemedView>
                <ThemedView style={styles.switchBetweenFrame}>
                    <ThemedText style={{
                        maxWidth: "75%"
                    }} >
                        Existe evidencia de lo denunciado (emails, fotos, etc.)
                    </ThemedText>
                    <Switch 
                        value={existeEvidencia} 
                        trackColor={{
                            false: 'gray',
                            true: JCA_BLUE
                            }}
                        onValueChange={ () => setExisteEvidencia(!existeEvidencia) }
                        thumbColor={
                            existeEvidencia ?
                            JCA_YELLOW
                            :
                            'white'
                        }
                        ios_backgroundColor={"gray"}
                    />
                </ThemedView>
                <ThemedView style={styles.switchBetweenFrame}>
                    <ThemedText style={{
                        maxWidth: "75%"
                    }} >
                        Existe conocimiento de otros antecedentes de índole similar
                    </ThemedText>
                    <Switch 
                        value={SCOAIS} 
                        trackColor={{
                            false: 'gray',
                            true: JCA_BLUE 
                            }}
                        onValueChange={ () => setSCOAIS(!SCOAIS) }
                        thumbColor={
                            SCOAIS ?
                            JCA_YELLOW
                            :
                            'white'
                        }
                        ios_backgroundColor={"gray"}
                    />
                </ThemedView>
                <ThemedView style={styles.switchBetweenFrame}>
                    <ThemedText style={{
                        maxWidth: "75%"
                    }}>
                        La situación denunciada fue informada previamente en otra instancia similar (jefatura, supervisor, mediación laboral, etc.)
                    </ThemedText>
                    <Switch 
                        value={SDPIS} 
                        trackColor={{
                            false: 'gray',
                            true: JCA_BLUE 
                            }}
                        onValueChange={ () => setSDPIS(!SDPIS) }
                        thumbColor={
                            SDPIS ?
                            JCA_YELLOW
                            :
                            'white'
                        }
                        ios_backgroundColor={"gray"}
                    />
                </ThemedView>
                <ThemedView>
                    <ThemedText style={{
                        maxWidth: "75%"
                    }} >
                        En caso de haber testigos, enumerarlos y completar sus datos
                    </ThemedText>
                    <Dropdown
                    data={cant_testigos}
                    labelField="label"
                    valueField="value"
                    placeholder="Definir cantidad"
                    value={cantidadDeTestigos}
                    onChange={
                        (item: {label: string, value: number}) => {
                            setCantidadDeTestigos(item.value)
                        }
                    }
                    style={styles.dropDownStyle}
                    selectedTextStyle={{
                        color:"white"
                    }}
                    />
                    {
                        cantidadDeTestigos !== 0 &&
                        Array.from({length: cantidadDeTestigos}, (_, i) => i).map( (item) => (
                            <ThemedView key={item.toString()} style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }} >
                                <LineHorizontal124Regular/>
                                <ThemedText style={{
                                    fontSize: 21,
                                    textAlign: "center"
                                }} > Testigo {item+1} </ThemedText>
                                <ThemedView>
                                    <ThemedText>Nombre y apellido</ThemedText>
                                    <TextInput style={styles.inputBox} onChangeText={} />
                                </ThemedView>
                                <ThemedView>
                                    <ThemedText>Cargo</ThemedText>
                                    <TextInput style={styles.inputBox}/>
                                </ThemedView>
                                <ThemedView>
                                    <ThemedText>Unidad/Servicio/Area</ThemedText>
                                    <TextInput style={styles.inputBox}  />
                                </ThemedView>
                            </ThemedView>
                        ))
                    }
                </ThemedView>
                <ThemedView>
                    <ThemedText>
                        Relato de la/s situación/es
                    </ThemedText>
                    <TextInput style={styles.bigInputBox}/>
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
        width: Dimensions.get("window").width * 0.9,
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
        marginVertical: 5
    },
    subTitleFrame: {
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: 'black',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 2,
        marginVertical: 5,
        textAlign: 'center',
    },
    switchFrame: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%'
    },
    switchBetweenFrame: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#123327',
        padding: 2
    },
    dropDownStyle: {
        backgroundColor: JCA_BLUE,
        padding: 12,
        borderRadius: 15,
        color: "white"
    },
    bigInputBox: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    }
})