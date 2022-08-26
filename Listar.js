import React, { useEffect, useState } from "react";
import { View, Text, VirtualizedList, SafeAreaView } from "react-native";
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
        "create table if not exists nomes (id integer " +
          "primary key not null, nome text, sobrenome text);"
      );
      tx.executeSql("Select * from nomes;", [], (_, { rows }) => {
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
  });

  const getItemCount = (data) => data.length;

  const Item = ({ nome, sobrenome }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.nome}>{sobrenome}</Text>
    </View>
  );

  const atualizarDados = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from nomes", [], (_, { rows }) => {
        console.log(JSON.stringify(rows));
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
          <Item nome={item.nome} sobrenome={item.sobrenome} />
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
