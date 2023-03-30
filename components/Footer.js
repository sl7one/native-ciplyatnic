import { StyleSheet, Text, View } from 'react-native';
import { headers, mainBox } from '../utils/mainStyles';

export const Footer = ({ title }) => {
  return (
    <View style={{ ...styles.mainBox, backgroundColor: 'yellow' }}>
      <Text style={styles.headers}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBox,
  headers,
});
