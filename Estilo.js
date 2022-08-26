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
      height: 150,
      justifyContent: "center",
      marginVertical: 8,
      marginHorizontal: 16,
      padding: 20,
    },
    nome: {
      fontSize: 32,
      color: "black"
    },
  });

export default Estilo;