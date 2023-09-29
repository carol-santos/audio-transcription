import { StatusBar } from 'expo-status-bar';
import React from 'react'
import HomeTest from './src/pages/HomeTest';
import { NativeBaseProvider } from "native-base";


export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar translucent backgroundColor="transparent" />
        <HomeTest/>
    </NativeBaseProvider>
  );
}