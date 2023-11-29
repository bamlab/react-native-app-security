import { Button, StyleSheet, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="fetch - valid certificates" onPress={fetchValid} />
      <Button title="fetch - invalid certificates" onPress={fetchInvalid} />
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
