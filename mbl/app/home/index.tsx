import { View, Text, StyleSheet } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>this is a home page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#407BFF",
    height: "100%",
    width: "100%",
  },
});

export default Home;
