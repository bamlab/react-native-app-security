import { useRef } from "react";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

export default function WebViewPinOk() {
  const webViewRef = useRef<WebView>(null);

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: "https://yahoo.com" }}
      style={styles.webview}
      onError={({ nativeEvent }) => {
        console.warn("✅ Invalid pin and load failed", nativeEvent.description);
      }}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
