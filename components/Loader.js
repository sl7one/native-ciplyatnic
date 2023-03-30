import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { text, theme } from '../utils/mainStyles';

export const Loader = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={theme.colors.positiveButton} />
      <Text style={styles.text}> Подождите, идет загрузка...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text,
});
