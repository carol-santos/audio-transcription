import { useState } from 'react';
import * as React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text, Button, Video} from 'react-native'
import {launchImageLibrary} from 'react-native-image-picker';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import { FFmpegKit } from 'ffmpeg-kit-react-native';

export default function HomeTest() {

    const [video, setVideo] = useState(null);
    const [audio, setAudio] = useState("");

    const pickVideo = async () => {
        let result = await launchImageLibrary({
            mediaType: "video",
        });
        console.log("Resultado : ",result)

        if(!result.cancelled){
          const videoUri = result.assets[0].uri
          console.log("URI do vídeo selecionado:", videoUri);
          setVideo(result.uri);
        }
    }

    const convertVideoToAudio = async () => {
  
      // const command = '-i ${videoUri} -vn -c:a mp3 -strict -2 test.mp3';
      // const command = '-i ${videoUri} -c:v mp3 audio.mp3';

      // const session = FFmpegKit.execute(command);
      // const returnCode = await session.getReturnCode();

      // if (ReturnCode.isSuccess(returnCode)) {
      //     const data = ffmpeg.FS('readFile', 'test.mp3');
      //     setAudio(URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' })));
      //     console.log("audio:", data)
      //     console.log("Áudio convertido com sucesso");
      // } else {
      //     console.error("Erro durante a conversão de vídeo para áudio");
      // }

      const session = FFmpegKit.execute("-i ${videoUri} -c:v mp3 audio.mp3");
      if (ReturnCode.isSuccess(session.getReturnCode())) {
            const data = ffmpeg.FS('readFile', 'test.mp3');
            setAudio(URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' })));
            console.log("audio:", data)
            console.log("Áudio convertido com sucesso");
      } else if (ReturnCode.isCancel(session.getReturnCode())) {

      } else {
          Log.d(TAG, String.format("Command failed with state %s and rc %s.%s", session.getState(), session.getReturnCode(), session.getFailStackTrace()));
      } 
    };

    const playAudio = () => {
      // if (audio) {
      //   try {
      //     SoundPlayer.playSoundFile(audio, 'mp3');
      //   } catch (error) {
      //     console.error('Erro ao reproduzir o áudio:', error);
      //   }
      // }
    };

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Conversão de vídeo em áudio</Text>
        <Button
          title='Escolha video na galeria'
          onPress={pickVideo}
        />
        <Button title='Converter' onPress={convertVideoToAudio}/>
        {/* <Button title='Reproduzir áudio' onPress={playAudio} /> */}
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
    text: {
      color: "#1E1D1D",
      fontSize: 20,
      fontWeight: 'bold',
    },
  });