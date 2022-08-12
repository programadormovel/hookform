import React from 'react';
import { Text, View, TextInput, Button, 
  Alert, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

export default function HookForm() {

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        value = {"nome"} />
      
      <TextInput 
        style={styles.input}
        value={'sobrenome'} />

      <Button title="Enviar Dados" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: "#ccc",
    margin: 8,
    padding: 8,
    minWidth: '70%',
    borderRadius: 8,
  }
})