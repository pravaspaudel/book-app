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
import Constants from "expo-constants";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiUrl = Constants.expoConfig?.extra?.apiUrl;

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
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

      if (!res.ok || data.success === false) {
        setError(data.message || "something went wrong");
        setLoading(false);
        return;
      }

      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
        console.log(`regsistered successfully ${data.message}`);
        alert("Login successful");
        router.replace("/home");
      }
    } catch (err: unknown) {
      console.log("Error in fetching", err);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>Loading.....</Text>
      </View>
    );
  }

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
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#407BFF"
                ></Ionicons>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={{ textAlign: "center", color: "white" }}>Login</Text>
          </TouchableOpacity>

          {error ? (
            <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>
              {error}
            </Text>
          ) : null}
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
