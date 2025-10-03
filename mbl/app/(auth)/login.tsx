import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://192.168.18.101:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data && data.token) {
        await AsyncStorage.setItem("userToken", data.token);
        console.log("token saved: ", data.token);
      }

      console.log(`regsistered successfully ${data.message}`);
    } catch (err: unknown) {
      console.log("Error in fetching", err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={require("../../assets/img/reading.png")}
            style={styles.img}
          />
        </View>

        <View style={styles.loginContainer}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputGroup}>
              <Ionicons name="mail-outline" size={20} color="#555" />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#888"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputGroup}>
              <Ionicons name="lock-closed-outline" size={20} color="#555" />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#888"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={{ textAlign: "center", color: "white" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingTop: 50,
  },

  imgContainer: {
    height: width * 0.6,
    width: width * 0.6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  loginContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  fieldGroup: {
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#333",
  },

  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#fefefe",
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },

  loginBtn: {
    borderRadius: 5,
    backgroundColor: "#407BFF",
    padding: 7,
  },
});

export default Login;
