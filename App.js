import React from 'react';
import { Text, View, TextInput, Button, 
  Alert, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

export default function HookForm() {

  return (
    <View>
      <TextInput value = {"nome"} />
      <TextInput value={'sobrenome'} />
      <Button title="Enviar Dados" />
    </View>
  )
}