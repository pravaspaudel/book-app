import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// Define the expected shape of your profile data
interface ProfileData {
  id: string;
  name: string;
  email: string;
  [key: string]: any; // for extra fields you might have
}

const Profile: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiUrl: string = Constants.expoConfig?.extra?.apiUrl ?? "";

  useEffect(() => {
    const loadProfile = async (): Promise<void> => {
      try {
        // Get token from AsyncStorage
        const storedToken = await AsyncStorage.getItem("token");
        if (!storedToken) {
          setError("No token found");
          return;
        }
        setToken(storedToken);

        if (!apiUrl) {
          setError("No API URL found");
          return;
        }

        // Fetch user profile
        const res = await fetch(`${apiUrl}/api/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!res.ok) {
          const message = await res.text();
          setError(`Error: ${message}`);
          return;
        }

        const data: ProfileData = await res.json();
        setProfile(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {token && <Text>Token: {token}</Text>}
      {profile ? (
        <>
          <Text>Name: {profile.name}</Text>
          <Text>Email: {profile.email}</Text>
        </>
      ) : (
        <Text>Loading profile...</Text>
      )}
    </View>
  );
};

export default Profile;

// Basic styles for readability
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginVertical: 8,
  },
});
