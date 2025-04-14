import { getToken } from "@/constants/constants";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function Contracts() {

    const [token, setToken] = useState<string | null>(null)

    useEffect( () => {
        if(!token){
            getToken(setToken)
        }
    }, [token] ) 

    return (
        <ScrollView></ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        height: "100%"
    }
})