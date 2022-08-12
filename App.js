import React from 'react';
import { Text, View, TextInput, Button, 
  Alert, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HookForm() {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: "",
      sobrenome: "",
    }
  });

  const onSubmit = async (data) => {
    console.log(data);

    // Dados serão armazenados no AsyncStorage
    try {
      // Dados serão transformados em um objeto JSON
      const dadosJSON = JSON.stringify(data);
      // Dados transformados serão guardados no AsyncStorage
      await AsyncStorage.setItem('@dados', dadosJSON);
      // Mensagem
      Alert.alert(data.nome + "\n" + 
        data.sobrenome);
    } catch (e) {
      // saving error
      Alert.alert(e.message);
    }  

  };

  return (
    <View style={styles.container}>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value }}) => (
          <TextInput 
            style={styles.input}
            value = {value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Digite seu nome"
          />
        )}   
        name="nome"   
      />
      {errors.nome && <Text>Campo obrigatório!</Text> }

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value }}) => (
          <TextInput 
            style={styles.input}
            value = {value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Digite seu sobrenome"
          />
        )}
        name="sobrenome"      
      />

      <Button title="Enviar Dados" onPress={handleSubmit(onSubmit)} />

      <Button title="Recuperar Dados"
          onPress={async ()=>{
            try {
              const dadosJSONRecuperados = await AsyncStorage.getItem('@dados');
              if(dadosJSONRecuperados !== null) {
                // dados gravados no AsyncStorage
                const dados = JSON.parse(dadosJSONRecuperados);
                // Mostrar dados na tela
                Alert.alert(dados.nome + "\n" + dados.sobrenome);
              }
            } catch(e) {
              // erro ao ler valores
              Alert.alert(e.message);
            }
          }}
          />
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