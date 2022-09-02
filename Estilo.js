import { StyleSheet} from "react-native";

const Estilo = StyleSheet.create({
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
    },
    item: {
      backgroundColor: "#f9c2ff",
      height: 300,
      justifyContent: "center",
      marginVertical: 8,
      marginHorizontal: 16,
      padding: 20,
    },
    nome: {
      fontSize: 32,
      color: "black"
    },
    containerImagem: {
      width: 100, 
      height: 200, 
      marginTop: 40, 
      alignSelf: "center",
    },
    imagem: {
      width:100, 
      height: 100
    },
  });

export default Estilo;