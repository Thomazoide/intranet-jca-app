import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Tabs } from "expo-router";
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Platform } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Document24Filled, Feed24Filled, Form24Filled, Person24Filled } from "@fluentui/react-native-icons"

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
                name='contract'
                options={{
                    title: 'Contrato',
                    tabBarIcon: ({color}) => <Document24Filled primaryFill={color} />
                }}
            />
            <Tabs.Screen
                name='liquidations'
                options={{
                    title: 'Liquidaciones',
                    tabBarIcon: ({color}) => <Feed24Filled primaryFill={color} />
                }}
            />
            <Tabs.Screen
                name='leyKarin'
                options={{
                    title: 'Ley Karin',
                    tabBarIcon: ({color}) => <Form24Filled primaryFill={color} />
                }}
            />
            <Tabs.Screen
                name='myAccount'
                options={{
                    title: "Mi cuenta",
                    tabBarIcon: ({color}) => <Person24Filled primaryFill={color} />
                }}
            />
        </Tabs>
    )
}