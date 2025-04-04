import { Image, StyleSheet, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import LoginForm from '@/components/LoginForm';
import { router } from 'expo-router';

export default function HomeScreen() {
  const goToRequest = () => {
    router.push("/(tabs)/requestAccount")
  }
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
    height: 290,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
