import React, { useEffect, useState } from "react";
import { View, Text, VirtualizedList, SafeAreaView, Image } from "react-native";
import styles from "./Estilo";
import * as SQLite from "expo-sqlite";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll } from "firebase/storage";
// import "firebase/storage";

const Listar = () => {
  const [DATA, setDATA] = useState([]);

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBePeLo3H-BLt06CYmfKck2IL7jmjIcK5A",
    authDomain: "hookform2022.firebaseapp.com",
    projectId: "hookform2022",
    storageBucket: "hookform2022.appspot.com",
    messagingSenderId: "1050960632308",
    appId: "1:1050960632308:web:327edb1e18e1f9a267c1a1",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const storage = getStorage(app); //, "gs://hookform2022.appspot.com");

  // Create a reference under which you want to list
  const listRef = ref(storage); //, "files/uid");

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Abrir ou criar banco de dados SQLite
  const db = SQLite.openDatabase("dados.db");

  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        // console.log(res);
        // setDATA(res);
      });
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        console.log(JSON.stringify(itemRef.name));
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });

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

    // listAll;
  }, []);

  const getItem = (data, index) => ({
    id: JSON.stringify(data._array[index].id),
    nome: JSON.stringify(data._array[index].nome),
    sobrenome: JSON.stringify(data._array[index].sobrenome),
    imagem: JSON.stringify(data._array[index].imagem)
      .replace('"', "")
      .replace('"', ""),
  });

  const getItemCount = (data) => data.length;

  const Item = ({ foto, nome, sobrenome }) => (
    <View style={styles.item}>
      <Image style={styles.imagem} source={{ uri: foto }} />
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.nome}>{sobrenome}</Text>
    </View>
  );

  const atualizarDados = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "select id, nome, sobrenome, imagem from nomes2",
        [],
        (_, { rows }) => {
          console.log(JSON.stringify(rows));
          console.log(
            JSON.stringify(rows._array[0].imagem)
              .replace('"', "")
              .replace('"', "")
          );
          setDATA(rows);
          //
          // console.log(JSON.stringify(DATA._array[0].nome));
        }
      );
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
            sobrenome={item.sobrenome}
          />
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
