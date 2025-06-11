import { Image, StyleSheet, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import LoginForm from '@/components/LoginForm';
import { router } from 'expo-router';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CHECK_TOKEN_URL } from '@/constants/constants';
import { ResponsePayload } from '@/constants/responsePayloads';

export default function HomeScreen() {
  const goToRequest = () => {
    router.push("/(tabs)/requestAccount")
  }

  const checkUserData = async () => {
    const userToken = await AsyncStorage.getItem("token")
    if(userToken){
      const response = (await axios.post(CHECK_TOKEN_URL, {token: userToken})).data as ResponsePayload<boolean>
      if(response.data){
        router.push("/(user)/landing")
      }
    }
  }

  useEffect( () => {
    checkUserData()
  }, [] )

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E9E9E7', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/escudo.webp')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <LoginForm/>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Button title="Solicitar cuenta" onPress={goToRequest} color="#132237" />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 250,
    width: 250,
    top: 0,
    left: 50,
    position: 'absolute'
  },
});
