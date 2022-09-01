import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, Button, 
  Alert, StyleSheet, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

import styles from './Estilo';
import * as ImagePicker from 'expo-image-picker';

export default function HookForm() {

  // Estados para captura de imagem
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);

  // Estado de controle de alterações na tabela
  const [forceUpdate] = useForceUpdate();
  // Abrir ou criar banco de dados SQLite
  const db = SQLite.openDatabase("dados.db");

  // Hook useEffect para criar o banco assim que a janela for carregada
  useEffect(() => {
    db.transaction((tx)=>{
      tx.executeSql(
        "create table if not exists nomes (id integer " +
           "primary key not null, nome text, sobrenome text)"
      );
    });
  }, []);

  useEffect(()=>{
    (async ()=> {
      if (Platform.OS !== 'web'){
        const {status} = await 
          ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status !== 'granted'){
          Alert.alert('Lamento, precisamos de sua ' +
          'permissão para executar este serviço');
        }
      }
    })();
    db.transaction((tx) => {
      tx.executeSql("create table if not exists nomes2 " +
      "(id integer primary key not null, " + 
      "nome text, sobrenome text, " +
      " imagem blob);")
    })
  }, []);

  const adicionar = (nome, sobrenome) => {
    if (nome === null || nome === ""){
      Alert.alert("Por favor, preencha o campo nome!")
    } else {
      db.transaction((tx) => {
        tx.executeSql("insert into nomes (nome, " + 
          "sobrenome) values (?, ?)", [nome, sobrenome]);
        tx.executeSql("select * from nomes", [], (_, 
            { rows }) =>
            console.log(JSON.stringify(rows))
            );    
      }, 
      null,
      useForceUpdate)
    }
  };

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
      // Solicitar gravação de dados na tabela dados.db SQLite
      adicionar(data.nome, data.sobrenome);
      // Mensagem
      Alert.alert(data.nome + "\n" + 
        data.sobrenome);
    } catch (e) {
      // saving error
      Alert.alert(e.message);
    }  
  };

  // Componente de carregamento da imagem da galeria
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if(!result.cancelled) {
      setImage(result.uri);
    }
  }

  const ImagemCarregada = () => (
    
  )

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



function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}
  