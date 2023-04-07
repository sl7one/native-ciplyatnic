import { observer } from 'mobx-react-lite';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { container, theme } from '../utils/mainStyles';
import { ordersStore } from '../store/ordersStore';
import { Loader } from '../components/Loader';
import SwiperList from '../components/SwiperList';
import { Ionicons } from '@expo/vector-icons';

export const Orders = observer(({ navigation }) => {
  const { isLoading } = ordersStore;

  return (
    <View style={{ ...styles.container }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SwiperList type="orders" />
          <TouchableHighlight
            style={styles.btn}
            underlayColor={theme.colors.underlayColor}
            activeOpacity={theme.colors.activeOpacity}
            onPress={() => navigation.navigate('Stats', { type: 'orders' })}
          >
            <Ionicons name="stats-chart" size={35} color={theme.colors.positiveButton} />
          </TouchableHighlight>
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container,
  btn: {
    width: '100%',
    height: 60,
    backgroundColor: theme.colors.orderLink,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
