import { StyleSheet, Text, View } from 'react-native';
import { headers, mainBox } from '../utils/mainStyles';

export const Header = () => {
  return (
    <View style={{ ...styles.mainBox, backgroundColor: 'red' }}>
      <Text style={styles.headers}>Header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBox,
  headers,
});
