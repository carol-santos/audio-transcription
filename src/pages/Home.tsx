import { StyleSheet, SafeAreaView, Pressable, Text} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react';

export default function Home() {
  const [recording, setRecording] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Pressable 
        style={[styles.button, recording && styles.recording]}
        onPressIn={() => {setRecording(true)}} //segurando o botão, gravando
        onPressOut={() => {setRecording(false)}} //soltar o botão, parando de gravar
      >
        <MaterialIcons
          name="mic"
          size={50}
          color="#1E1D1D"
        />
      </Pressable>
      {
        recording &&
        <Text style={styles.text}> Gravando </Text>
      }

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