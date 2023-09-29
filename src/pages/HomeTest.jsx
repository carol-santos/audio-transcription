import { useState } from 'react';
import * as React from 'react';
import { StyleSheet, SafeAreaView, Text, Button } from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Sound from 'react-native-sound';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';

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
          // setVideo(result.uri);
          setVideo(result.assets[0].uri);
        }
    }

    const convertVideoToAudio = async () => {
      
        const audioFile = video.replace('.mp4', '.mp3')

        // FFmpegKit.execute(`-i ${video} -c:v mpeg3 filePath.mp3`).then(async (session) => {
        FFmpegKit.execute(`-y -i ${video} -c:v mpeg3 ${audioFile}`).then(async (session) => {
        console.log("URI - convertVideoToAudio: ", video)

        const returnCode = await session.getReturnCode();
          console.log({returnCode, session})
        if (ReturnCode.isSuccess(returnCode)) {
            console.log('sucesso')
            setAudio(audioFile)
            console.log("Áudio convertido com sucesso");
        } else if (ReturnCode.isCancel(returnCode)) {
          console.log('elif')
        } else (error) => {
          console.log("Erro na conversão:", error)
        } 
        }).catch(e => console.log('error', e))
    };

    const playAudio = () => {

      var sound = new Sound(audio, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('Não foi possível carregar o som', error);
          return;
        }
        sound.play((success) => {
          if (success) {
            console.log('Áudio reproduzido com sucesso');
          } else {
            console.log('Erro ao reproduzir o áudio');
          }
        });
      });
    }

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Conversão de vídeo em áudio</Text>
        <Button
          title='Escolha video na galeria'
          onPress={pickVideo}
        />
        <Button title='Converter' onPress={convertVideoToAudio}/>
        <Button title='Reproduzir áudio' onPress={playAudio} />
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