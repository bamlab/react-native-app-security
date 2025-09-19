import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "react-native-app-security-example",
  slug: "react-native-app-security-example",
  scheme: "rnas-example",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "tech.bam.rnas.example",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "tech.bam.rnas.example",
  },
  plugins: [
    [
      "../app.plugin.js",
      {
        sslPinning: {
          "*.yahoo.com": [
            // Invalid pins to test failure
            "TQEtdMbmwFgYUifM4LDF+xgEtd0z69mPGmkp014d6ZY=",
            "rFjc3wG7lTZe43zeYTvPq8k4xdDEutCmIhI5dn4oCeE=",
          ],
          "google.com": [
            // One valid pin to test success
            "84mRRa9Yj6rhmZjvR2x2Qx0Zc62GHteMSUWiR7dfoVk=",
            "ylrexmVB/d9PHCARU9i0R9km/ahwuNpWaWXbpLyR7jQ=",
          ],
        },
        preventRecentScreenshots: {
          ios: {
            enabled: true,
          },
          android: {
            enabled: true,
          },
        },
        disableCache: {
          ios: {
            enabled: true,
          },
        },
      },
    ],
    "expo-router",
  ],
};

export default config;
