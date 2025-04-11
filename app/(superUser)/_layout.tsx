import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Tabs } from "expo-router";
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Platform } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { MailInboxAll24Filled } from "@fluentui/react-native-icons";

export default function UserLayout() {
    const colorScheme = useColorScheme()
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute'
                    },
                    default: {}
                })
            }}
        >
            <Tabs.Screen
                name='landing'
                options={{
                    title: 'Home',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name='house.fill' color={color}/>
                }}
            />
            <Tabs.Screen
                name="requests"
                options={{
                    title: 'Solicitudes',
                    tabBarIcon: ({color}) => <MailInboxAll24Filled primaryFill={color} /> 
                }}
            />
        </Tabs>
    )
}