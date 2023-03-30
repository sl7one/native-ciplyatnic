import { observer } from 'mobx-react-lite';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { modalNumbersStore } from '../store/modalNumbersStore';
import { text, theme } from '../utils/mainStyles';

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'Очистить', 0, 'Добавить'];

export const NumbersList = observer(() => {
  const { setNumbers } = modalNumbersStore;

  const items = array.map((el, idx) => (
    <View
      key={idx}
      style={{
        width: '33%',
        borderBottomWidth: idx >= 9 ? 0 : 0.5,
        borderLeftWidth: 0.5,
        borderColor: theme.colors.borderColor,
        backgroundColor:
          idx === 9
            ? theme.colors.negativeButton
            : 'transparent' && idx === 11
            ? theme.colors.positiveButton
            : 'transparent',
      }}
    >
      <TouchableHighlight
        activeOpacity={theme.activeOpacity}
        underlayColor={theme.colors.underlayColor}
        onPress={() => setNumbers(el)}
      >
        <Text style={{ ...styles.text, fontSize: 18, paddingVertical: 40, textAlign: 'center' }}>
          {el}
        </Text>
      </TouchableHighlight>
    </View>
  ));

  return <View style={styles.numbersContainer}>{items}</View>;
});

const styles = StyleSheet.create({
  text,
  numbersContainer: {
    height: '60%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
