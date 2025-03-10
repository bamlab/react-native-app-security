import { SafeKeyboardDetector } from "@bam.tech/react-native-app-security";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Modal, Platform, StyleSheet, View } from "react-native";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible}>
        <View style={styles.modal}>
          <Button title="show an alert" onPress={() => Alert.alert("Hello")} />
          <Button
            title="close modal"
            onPress={() => setIsModalVisible(false)}
          />
        </View>
      </Modal>
      <Button title="open modal" onPress={() => setIsModalVisible(true)} />
      <Button title="fetch - no pin" onPress={fetchUnpinned} />
      <Button title="fetch - valid certificates" onPress={fetchValid} />
      <Button title="fetch - invalid certificates" onPress={fetchInvalid} />
      <Button
        title="fetch - invalid certificates - subdomain"
        onPress={fetchInvalidSubdomain}
      />
      <Button
        title="WebView - valid pin (Google)"
        onPress={() => router.push("/webview-pin-ok")}
      />
      <Button
        title="WebView - invalid pin (Yahoo)"
        onPress={() => router.push("/webview-pin-ko")}
      />
      <Button title="Is current keyboard safe?" onPress={checkIsKeyboardSafe} />
      {Platform.OS === "android" ? (
        <Button
          title="show keyboard picker"
          onPress={() => SafeKeyboardDetector.showInputMethodPicker()}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
});

const fetchUnpinned = async () => {
  try {
    const response = await fetch("https://bing.com");
    console.warn("✅ fetch succeeded", {
      status: response.status,
    });
  } catch (error) {
    console.warn("❌ fetch failed", error);
  }
};

const fetchValid = async () => {
  try {
    const response = await fetch("https://google.com");
    console.warn("✅ valid certificate and fetch succeeded", {
      status: response.status,
    });
  } catch (error) {
    console.warn(
      "❌ valid certificate but fetch failed - public keys expire, make sure they are up to date",
      error
    );
  }
};

const fetchInvalid = async () => {
  try {
    const response = await fetch("https://yahoo.com");
    console.warn("❌ invalid certificate but fetch succeeded", {
      status: response.status,
    });
  } catch (error) {
    console.warn("✅ invalid certificate and fetch failed", error);
  }
};

const fetchInvalidSubdomain = async () => {
  try {
    const response = await fetch("https://login.yahoo.com");
    console.warn("❌ invalid certificated but fetch succeeded", {
      status: response.status,
    });
  } catch (error) {
    console.warn("✅ invalid certificate and fetch failed", error);
  }
};

const checkIsKeyboardSafe = () => {
  const isKeyboardSafe =
    SafeKeyboardDetector.getCurrentInputMethodInfo().isInDefaultSafeList;
  console.log(SafeKeyboardDetector.getCurrentInputMethodInfo().inputMethodId);
  console.warn("is Keyboard safe", isKeyboardSafe);
};
