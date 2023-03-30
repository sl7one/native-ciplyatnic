import { observer } from 'mobx-react-lite';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { formDataStore } from '../store/formDataStore';
import { ordersStore } from '../store/ordersStore';
import { text, theme } from '../utils/mainStyles';
import { Loader } from './Loader';

export const ModalButtons = observer(() => {
  const { setIsOpenAddItem, handleSubmitAddOrder } = formDataStore;
  const { isLoading } = ordersStore;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.buttonWrapper}>
      <TouchableHighlight
        style={{ ...styles.button, backgroundColor: theme.colors.positiveButton }}
        activeOpacity={theme.activeOpacity}
        underlayColor={theme.colors.underlayColor}
        onPress={() => handleSubmitAddOrder()}
      >
        <Text style={styles.text}>Добавить</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={{ ...styles.button, backgroundColor: theme.colors.negativeButton }}
        activeOpacity={theme.activeOpacity}
        underlayColor={theme.colors.underlayColor}
        onPress={() => setIsOpenAddItem(false)}
      >
        <Text style={styles.text}>Закрыть</Text>
      </TouchableHighlight>
    </View>
  );
});

const styles = StyleSheet.create({
  button: {
    height: 50,
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  text,
});
