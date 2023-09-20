import { StyleSheet, SafeAreaView, Pressable, Text, TextInput, View, TouchableOpacity} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import * as React from 'react';
import { Audio, InterruptionModeAndroid } from 'expo-av'

export default function Home() {
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const initialStatus = {
      shouldPlay: true,
      isMuted: false,
      isLooping: true
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      // androidImplementation: 'MediaPlayer',
  };
    const { sound } = await Audio.Sound.createAsync({uri: 'https://traffic.libsyn.com/unhcr/AAN_S7_-_Sara_Beysolow_Nyanti_v3_-_Approved.mp3'}, initialStatus)
    // const { sound } = await Audio.Sound.createAsync(require('../assets/music.mp3'), initialStatus)
    console.log({sound})
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    Audio.setAudioModeAsync({
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false,

    })
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={[styles.button]}
        onPressIn={playSound} //segurando o botão, gravando
      >
        <MaterialIcons
          name="play-circle-fill"
          size={50}
          color="#1E1D1D"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7E",
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#F55151",
    borderRadius: 50,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom: 10,
  },
  text: {
    color: "#1E1D1D",
    fontSize: 22,
    fontWeight: 'bold'
  },
  recording: {
    backgroundColor: "#74B555"
  }
});