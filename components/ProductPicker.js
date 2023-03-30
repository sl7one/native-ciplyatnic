import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { text, theme } from '../utils/mainStyles';
import { observer } from 'mobx-react-lite';
import { formDataStore } from '../store/formDataStore';
import { RemoveButton } from './RemoveButton';
import { modalNumbersStore } from '../store/modalNumbersStore';
import { modalProductStore } from '../store/modalProductStore';

export const ProductPicker = observer(({ type }) => {
  const { getlistItems } = formDataStore;
  const { setIsOpenCount } = modalNumbersStore;
  const { setIsOpenProduct } = modalProductStore;

  const items = getlistItems(type);

  return (
    <View style={{ marginTop: 10 }}>
      <ScrollView style={{ height: 300 }}>
        {!items.length ? (
          <Text style={{ ...styles.text, fontSize: 14, color: theme.colors.negativeButton }}>
            Элемент не добавлен
          </Text>
        ) : (
          items.map(({ type: product, price, count, id }) => (
            <View style={styles.item} key={id}>
              <RemoveButton type={type} id={id} />
              <View style={{ flex: 3 }}>
                <TouchableHighlight
                  activeOpacity={theme.activeOpacity}
                  underlayColor={theme.colors.underlayColor}
                  onPress={() => setIsOpenProduct(true, 'type', id, type)}
                  style={{ padding: 5, width: '100%', alignItems: 'flex-start' }}
                >
                  <Text style={styles.text}>{product}</Text>
                </TouchableHighlight>
              </View>
              <View style={{ flex: 2, alignItems: 'flex-end' }}>
                <TouchableHighlight
                  activeOpacity={theme.activeOpacity}
                  underlayColor={theme.colors.underlayColor}
                  onPress={() => setIsOpenCount(true, 'count', id, type)}
                  style={{ padding: 5, width: '100%', alignItems: 'flex-end' }}
                >
                  <Text style={styles.text}>{count} шт</Text>
                </TouchableHighlight>
              </View>
              <View style={{ flex: 2 }}>
                <TouchableHighlight
                  activeOpacity={theme.activeOpacity}
                  underlayColor={theme.colors.underlayColor}
                  onPress={() => setIsOpenCount(true, 'price', id, type)}
                  style={{ padding: 5, width: '100%', alignItems: 'flex-end' }}
                >
                  <Text style={styles.text}>{price} грн</Text>
                </TouchableHighlight>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: theme.colors.borderColor,
  },
  text,
});
