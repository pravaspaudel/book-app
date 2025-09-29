import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Button } from "@react-navigation/elements";
import { Link } from "expo-router";

const SignUp = () => {
  const handleSignUp = () => {
    console.log("sign up button clicked");
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textContent}>BookWorm </Text>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Share your favorite read
        </Text>
      </View>

      {/* field group */}
      <View style={styles.fieldContainer}>
        <View style={styles.fieldGroup}>
          <Text>Full Name</Text>
          <View style={styles.inputGroup}>
            <Ionicons name="person-outline" size={24} color="#407BFF" />
            <TextInput placeholder="Enter your name" />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text>Email</Text>
          <View style={styles.inputGroup}>
            <Ionicons name="mail-outline" size={24} color="#407BFF" />
            <TextInput placeholder="Enter your name" />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text>Password</Text>
          <View style={styles.inputGroup}>
            <Ionicons name="lock-closed-outline" size={24} color="#407BFF" />
            <TextInput placeholder="enter password" />
          </View>
        </View>

        <TouchableOpacity style={styles.signupPress} onPress={handleSignUp}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.alreadyContainer}>
          <Text style={{ textAlign: "center" }}>Already signin</Text>
          <Link href={"/(auth)/login"} style={{ color: "#407BFF" }}>
            Login
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffff",
  },

  textContainer: {
    marginTop: 150,
  },

  textContent: {
    fontFamily: "Poppins-Regular",
    fontSize: 50,
    fontWeight: "600",
    color: "#407BFF",
    textAlign: "center",
  },

  inputGroup: {
    marginVertical: 9,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
    padding: 5,
    gap: 2,
  },

  fieldGroup: {
    padding: 4,
    gap: 5,
  },

  fieldContainer: {
    paddingVertical: 30,
    padding: 9,
    left: 0,
    right: 0,
    position: "absolute",
    bottom: 100,
    margin: 15,
    elevation: 2,
  },

  signupPress: {
    backgroundColor: "#407BFF",
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
  },

  signupText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },

  alreadyContainer: {},
});

export default SignUp;
