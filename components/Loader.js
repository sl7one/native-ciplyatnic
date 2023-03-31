import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { text, theme } from '../utils/mainStyles';

export const Loader = ({ title = 'Подождите, загружаем данные ...' }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={theme.colors.positiveButton} />
      <Text style={styles.text}>{title} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text,
});
