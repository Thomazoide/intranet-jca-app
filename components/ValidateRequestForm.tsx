import { ACCOUNT_REQUEST_ENDPOINT, RequestSelection, USERS_ENDPOINT } from "@/constants/constants";
import { AccountRequestPayload } from "@/constants/requestsPayloads";
import { ResponsePayload } from "@/constants/responsePayloads";
import { AccountRequest } from "@/models/accountRequest.model";
import { CARGOS, User } from "@/models/user.model";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Alert, Button, StyleSheet, TextInput } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Dropdown } from "react-native-element-dropdown";

interface VRFProps {
    request: AccountRequest
    accessToken: string
    setShowForm: Dispatch<SetStateAction<RequestSelection>>
    getRequests: VoidFunction
}

export default function ValidateRequestForm(props: Readonly<VRFProps>) {
    const [nombre, setNombre] = useState<string>()
    const [apellido, setApellido] = useState<string>()
    const [rut, setRut] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [cargo, setCargo] = useState<CARGOS | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [superUser, setSuperUser] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const [isFocusSuperUser, setIsFocusSuperUser] = useState<boolean>(false)

    const createUser = async () => {
        if(!nombre || !apellido || !rut || !email || !password || !cargo){
            Alert.alert("ERROR", "Debe llenar todos los campos")
            setError(new Error("Se deben llenar todos los campos"))
            return
        }
        const payload: Partial<User> = {
            fullName: `${nombre} ${apellido}`,
            email: email!,
            rut: rut!,
            isAdmin: superUser,
            cargo: cargo!,
            password: password!
        }
        const requestSchema: AccountRequestPayload = {
            rut: props.request.rut,
            email: props.request.email
        }
        setIsLoading(true)
        try{
            const response: ResponsePayload<User> = (await axios.post(USERS_ENDPOINT, payload)).data
            if(response.error){
                throw new Error(response.message)
            }
            const changeRequestResponse: ResponsePayload<AccountRequest> = (await axios.put(ACCOUNT_REQUEST_ENDPOINT, requestSchema, {
                headers: {
                    Authorization: `Bearer ${props.accessToken}`
                }
            })).data
            if(changeRequestResponse.error){
                throw new Error(changeRequestResponse.message)
            }
            setError(null)
            setSuccess(true)
        }catch(err: any){
            setSuccess(false)
            const newError: Error = err
            setError(newError)
        }finally{
            setIsLoading(false)
        }
    }

    const cargoOptions = Object.values(CARGOS).map( (value) => ({
        label: value,
        value: value
    }) )

    useEffect( () => {
        if(success) {
            setError(null)
            Alert.alert("SOLICITUD COMPLETADA", "Usuario creado con éxito...", undefined, {
                onDismiss: props.getRequests
            })
        }
    }, [success] )

    return(
            <ThemedView style={styles.formContainer} >
                <ThemedView style={styles.section} >
                    <ThemedText>Nombre</ThemedText>
                    <TextInput style={styles.textInput} onChangeText={ (text) => setNombre(text) } />
                </ThemedView>
                <ThemedView style={styles.section} >
                    <ThemedText>Apellido</ThemedText>
                    <TextInput style={styles.textInput} onChangeText={ (text) => setApellido(text) } />
                </ThemedView>
                <ThemedView style={styles.section} >
                    <ThemedText>Rut</ThemedText>
                    <TextInput style={styles.textInput} placeholder="Sin puntos, con guión" onChangeText={ (text) => setRut(text) } />
                </ThemedView>
                <ThemedView style={styles.section} >
                    <ThemedText>Email</ThemedText>
                    <TextInput style={styles.textInput} onChangeText={ (text) => setEmail(text) } />
                </ThemedView>
                <ThemedView style={styles.section} >
                    <ThemedText>Contraseña</ThemedText>
                    <TextInput style={styles.textInput} onChangeText={ (text) => setPassword(text) } />
                </ThemedView>
                <ThemedView style={styles.section} >
                    <ThemedText>Cargo</ThemedText>
                    <Dropdown
                        style={[styles.dropdown, isFocus && styles.dropdownFocus]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={cargoOptions}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Selecciona el cargo' : '...'}
                        value={cargo}
                        onFocus={ () => setIsFocus(true) }
                        onBlur={ () => setIsFocus(false) }
                        onChange={ (item) => {
                            setCargo(item.value as CARGOS)
                            setIsFocus(false)
                        } }
                    />
                </ThemedView>
                <ThemedView style={styles.section} >
                    <ThemedText>Super usuario?</ThemedText>
                    <Dropdown
                        style={[styles.dropdown, isFocus && styles.dropdownFocus]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={[
                            {label: 'Sí', value: true},
                            {label: 'No', value: false}
                        ]}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusSuperUser ? 'Selecciona el cargo' : '...'}
                        value={superUser}
                        onFocus={ () => setIsFocusSuperUser(true) }
                        onBlur={ () => setIsFocusSuperUser(false) }
                        onChange={ (item) => {
                            setSuperUser(item.value)
                            setIsFocusSuperUser(false)
                        } }
                    />
                </ThemedView>
                <ThemedView style={styles.buttonSection}>
                    <Button title={ isLoading ? "Cargando..." : "Enviar" } onPress={createUser} color="#132237" disabled={ isLoading ? true : false }  />
                    <Button title="Cancelar" onPress={ () => props.setShowForm({
                        ID: props.request.id,
                        showForm: false
                    }) } color="#132237" />
                </ThemedView>
                {
                    error &&
                    <ThemedView>
                        <ThemedText style={{color:'red'}} > {error.message} </ThemedText>
                    </ThemedView>
                }
            </ThemedView>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        width: '100%',
        padding: 3
    },
    textInput: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#132237',
        borderRadius: 5,
        width: 200,
        height: 40
    },
    section: {
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        textAlign: 'center',
        justifyContent: 'center'
    },
    dropdown: {
        height: 50,
        borderColor: '#132237',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        width: 200
    },
    dropdownFocus: {
        borderColor: '#1E90FF'
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#C0C0C0'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#000'
    },
    buttonSection: {
        display: 'flex',
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8
    }
})