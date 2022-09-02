import React, { useEffect, useState } from "react";
import { View, Text, VirtualizedList, SafeAreaView, 
  Image } from "react-native";
import styles from "./Estilo";
import * as SQLite from "expo-sqlite";

const Listar = () => {
  // Abrir ou criar banco de dados SQLite
  const db = SQLite.openDatabase("dados.db");

  const [DATA, setDATA] = useState([]);

  // Criar tabela e selecionar linhas
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists nomes2 (id integer " +
          "primary key not null, nome text, sobrenome text, imagem blob);"
      );
      tx.executeSql("Select * from nomes2;", [], (_, { rows }) => {
        console.log(JSON.stringify(rows));
        setDATA(rows);
        // console.log(JSON.stringify(DATA._array[1].nome));
      });
    });
  }, []);

  const getItem = (data, index) => ({
    id: JSON.stringify(data._array[index].id),
    nome: JSON.stringify(data._array[index].nome),
    sobrenome: JSON.stringify(data._array[index].sobrenome),
    imagem: JSON.stringify(data._array[index].imagem)
    .replace("\"", "")
    .replace("\"", ""),
  });

  const getItemCount = (data) => data.length;

  const Item = ({ foto, nome, sobrenome }) => (
    <View style={styles.item}>
      <Image style={styles.imagem} 
        source={{ uri : foto}} />
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.nome}>{sobrenome}</Text>
    </View>
  );

  const atualizarDados = () => {
    db.transaction((tx) => {
      tx.executeSql("select id, nome, sobrenome, imagem from nomes2", [], (_, { rows }) => {
        console.log(JSON.stringify(rows));
        console.log(JSON.stringify(rows._array[0].imagem).replace("\"", "")
            .replace("\"", ""));
        setDATA(rows);
        //
        // console.log(JSON.stringify(DATA._array[0].nome));
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        data={DATA}
        initialNumToRender={4}
        renderItem={({ item }) => (
          <Item 
            foto={item.imagem}
            nome={item.nome} 
            sobrenome={item.sobrenome} />
        )}
        keyExtractor={(item) => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
        refreshing={true}
        scrollEnabled={true}
        onScroll={atualizarDados}
      />
    </SafeAreaView>
  );
};

export default Listar;
