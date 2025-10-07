import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type dataType = {
  success: boolean;
  message: string;
  token?: string;
};

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const apiUrl = Constants.expoConfig?.extra?.apiUrl ?? "Not defined";
  console.log("API URL:", apiUrl);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data: dataType = await res.json();

      if (!res.ok || data.success === false) {
        setError(data.message || "something went wrong");
        setLoading(false);
        return;
      }

      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
        console.log(`regsistered successfully ${data.message}`);
        alert("Login successful");
        router.replace("/(tabs)");
      }
    } catch (err: unknown) {
      console.log("Error in request", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

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
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textContent}>Bookly</Text>
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
                <TextInput
                  style={{ width: "100%", height: "100%" }}
                  placeholder="Enter your name"
                  value={username}
                  onChangeText={setUserName}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text>Email</Text>
              <View style={styles.inputGroup}>
                <Ionicons name="mail-outline" size={24} color="#407BFF" />
                <TextInput
                  style={{ width: "100%", height: "100%" }}
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text>Password</Text>
              <View style={styles.inputGroup}>
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color="#407BFF"
                />
                <TextInput
                  style={{ flex: 1, height: "100%" }}
                  placeholder="Enter password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="#407BFF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.signupPress} onPress={handleSignUp}>
              <Text style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={{ textAlign: "center" }}>
                Already signin?
                <Link
                  href={"/(auth)/login"}
                  style={{ color: "#407BFF", marginLeft: 5 }}
                >
                  Login
                </Link>
              </Text>
            </View>

            {error ? (
              <Text
                style={{ color: "red", textAlign: "center", marginTop: 10 }}
              >
                {error}
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffff",
  },

  textContainer: {
    marginTop: 100,
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
    width: "90%",
    margin: 15,
    paddingVertical: 30,
    padding: 9,
    borderWidth: 0.5,
    borderRadius: 5,
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
  loginContainer: {
    marginVertical: 4,
  },
});

export default SignUp;
