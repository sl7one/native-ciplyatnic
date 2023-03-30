import { observer } from 'mobx-react-lite';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { formDataStore } from '../store/formDataStore';
import { text, theme } from '../utils/mainStyles';

export const ProductHeader = observer(({ type, title }) => {
  const { addItem } = formDataStore;

  return (
    <View style={styles.accordionHeader}>
      <Text style={styles.text}>{title}</Text>
      <TouchableHighlight
        underlayColor={theme.colors.underlayColor}
        activeOpacity={theme.activeOpacity}
        onPress={() => addItem(type)}
      >
        <Icon name="plussquareo" size={24} color={theme.colors.positiveButton} />
      </TouchableHighlight>
    </View>
  );
});

const styles = StyleSheet.create({
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  text,
});
