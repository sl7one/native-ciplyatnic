import { observer } from 'mobx-react-lite';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { modalProductStore } from '../store/modalProductStore';
import { categoriesStore } from '../store/categoriesStore';
import { text } from '../utils/mainStyles';

export const ProductList = observer(() => {
  const { poultryCategories } = categoriesStore;
  const { setProduct } = modalProductStore;

  const items = poultryCategories.map((el, idx, array) => (
    <View
      key={el}
      style={{
        width: '33%',
        borderBottomWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: idx === array.length - 1 ? 0.5 : 0,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableHighlight
        activeOpacity={0.9}
        underlayColor="rgba(0,0,0,0.05)"
        onPress={() => setProduct(el)}
        style={{
          paddingHorizontal: 15,
          paddingVertical: 45,
          width: '100%',
        }}
      >
        <Text
          style={{
            ...styles.text,
            fontSize: 18,
            textAlign: 'center',
          }}
        >
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
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
