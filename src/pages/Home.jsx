import { StyleSheet, SafeAreaView,TouchableOpacity, Text} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import * as React from 'react';
import { Audio, InterruptionModeAndroid } from 'expo-av'
import Voice from '@react-native-voice/voice'

export default function Home() {
  
  const [sound, setSound] = React.useState();
  const [result, setResult] = React.useState(''); 
  const [error, setError] = React.useState(''); 
  const [isRecording, setIsRecording] = React.useState(false); 

	Voice.onSpeechStart = () => setIsRecording(true)
	Voice.onSpeechEnd = () => setIsRecording(false)
  Voice.onSpeechError = (err) => setError(err.error); 
  Voice.onSpeechResults = (result) => setResult(result.value[0]);
  
  async function playSound() {

    await Voice.start('en-US'); 
    setIsRecording(true);

    console.log('Loading Sound');
    const initialStatus = {
      shouldPlay: true,
      isMuted: false,
      isLooping: false
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      // androidImplementation: 'MediaPlayer',
  };
    const { sound } = await Audio.Sound.createAsync({uri: 'https://traffic.libsyn.com/unhcr/AAN_S7_-_Sara_Beysolow_Nyanti_v3_-_Approved.mp3'}, initialStatus)
    // const { sound } = await Audio.Sound.createAsync({uri: 'https://edisciplinas.usp.br/pluginfile.php/5182766/mod_resource/content/0/mpthreetest.mp3'}, initialStatus)
    // const { sound } = await Audio.Sound.createAsync(require('../assets/music.mp3'), initialStatus)
    console.log({sound})
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  const stopSound = async () => {
      //await Voice.stop()
      console.log('Stopping Sound');
      await sound.stopAsync();

  };

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
      <Text>Transcrição</Text>
      <Text>{result}</Text>
      <Text>{error}</Text>
      <TouchableOpacity
        style={[styles.button]}
        onPressIn={isRecording ? stopSound : playSound}
      >
        <Text style={styles.text}>
          {isRecording ? 'stop Sound' : 'play Sound'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7E7E7",
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