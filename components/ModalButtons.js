import { observer } from 'mobx-react-lite';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { ordersStore } from '../store/ordersStore';
import { text, theme } from '../utils/mainStyles';
import { Loader } from './Loader';

export const ModalButtons = observer(({ positiveBtn, negativeBtn }) => {
  const { isLoading } = ordersStore;

  const onPressPositiveBtn = () => {
    positiveBtn.fn();
  };

  const onPressNegativeBtn = () => {
    negativeBtn.fn();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.buttonWrapper}>
      <TouchableHighlight
        style={{ ...styles.button, backgroundColor: theme.colors.positiveButton }}
        activeOpacity={theme.activeOpacity}
        underlayColor={theme.colors.underlayColor}
        onPress={onPressPositiveBtn}
      >
        <Text style={styles.text}>{positiveBtn.title}</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={{ ...styles.button, backgroundColor: theme.colors.negativeButton }}
        activeOpacity={theme.activeOpacity}
        underlayColor={theme.colors.underlayColor}
        onPress={onPressNegativeBtn}
      >
        <Text style={styles.text}>{negativeBtn.title}</Text>
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
