import React from 'react'
import { StyleSheet, SafeAreaView, View, TextInput, Text } from 'react-native'
import { useRef, useEffect, useState } from 'react';
import axios from 'axios'

// const VITE_OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const OPENAI_API_KEY = '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'
const model = 'whisper-1'

export function Test() {

    const inputRef = useRef();
    const [file, setFile] = useState(); //arquivo selecionado pelo usuário
    const [response, setResponse] = useState(null); //resposta da API após a transcrição do áudio

    const onChangeFile = () => {
        if(inputRef?.current.file[0]){
            setFile(inputRef?.current.file[0]);
        }
    }

    useEffect(() => {
        const fetchAudioFile = async () => {
            if(!file){
                return
            }

            const formData = new FormData();
            formData.append("model", model)
            formData.append("file", file)

            axios.post("https://api.openai.com/v1/audio/transcriptions", formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                }
            })
            .then((res) => {
                console.log(res.data);
                setResponse(res.data);
            })
            // .catch((error)) => {
            //     console.log(error)
            // }
        }
        fetchAudioFile();
    }, [file]);

   return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* <Text>Whisper</Text> */}
        <TextInput
            type="file"
            ref={inputRef}
            accept=".mp3"
            onChangeText={onChangeFile}
            style={styles.input}
        />
        {response && <Text>{JSON.stringify(response, null, 2)}</Text>}
      </View>
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
    contentContainer:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center", 
      marginBottom: 80,
    },
    input: {
        height: 40,
        margin: 60,
        borderWidth: 1,
        padding: 10,
      },
  });
