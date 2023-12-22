import { SafeKeyboardDetector } from "@bam.tech/react-native-app-security";
import { useState } from "react";
import { Button, Modal, Platform, StyleSheet, View } from "react-native";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible}>
        <View style={styles.modal}>
          <Button
            title="close modal"
            onPress={() => setIsModalVisible(false)}
          />
        </View>
      </Modal>
      <Button title="open modal" onPress={() => setIsModalVisible(true)} />
      <Button title="fetch - valid certificates" onPress={fetchValid} />
      <Button title="fetch - invalid certificates" onPress={fetchInvalid} />
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

const fetchValid = async () => {
  try {
    const response = await fetch("https://google.com");
    console.warn("✅ valid certificate and fetch succeeded", {
      status: response.status,
    });
  } catch (error) {
    console.warn("❌ valid certificate but fetch failed", error);
  }
};

const fetchInvalid = async () => {
  try {
    const response = await fetch("https://yahoo.com");
    console.warn("❌ invalid certificated but fetch succeeded", {
      status: response.status,
    });
  } catch (error) {
    console.warn("✅ invalid certificate and fetch failed", error);
  }
};

const checkIsKeyboardSafe = () => {
  const isKeyboardSafe = SafeKeyboardDetector.isCurrentKeyboardSafe();
  console.warn("is Keyboard safe", isKeyboardSafe);
};
