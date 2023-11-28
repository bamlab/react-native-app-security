import { StyleSheet, Text, View } from 'react-native';

import * as RNAS from '@bam.tech/react-native-app-security';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{RNAS.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
