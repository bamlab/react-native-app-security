import { useRef } from "react";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

export default function WebViewPinOk() {
  const webViewRef = useRef<WebView>(null);

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: "https://google.com" }}
      style={styles.webview}
      onError={({ nativeEvent }) => {
        console.warn("❌ Valid pin and load failed", nativeEvent.description);
      }}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
