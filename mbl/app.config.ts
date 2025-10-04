import "dotenv/config";
import { ExpoConfig } from "@expo/config-types";

const config: ExpoConfig = {
  name: process.env.APP_NAME || "MyExpoApp",
  slug: "my-expo-app",
  version: "1.0.0",
  scheme: "myexpoapp",
  extra: {
    apiUrl: process.env.API_URL || "https://fallback.example.com",
  },
};

export default config;
