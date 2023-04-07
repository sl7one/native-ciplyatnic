import { View, StyleSheet } from 'react-native';
import SwiperList from '../components/SwiperList';
import { container } from '../utils/mainStyles';
import { ordersStore } from '../store/ordersStore';
import { Loader } from '../components/Loader';
import { observer } from 'mobx-react-lite';

export const Purchases = observer(() => {
  const { isLoading } = ordersStore;
  return (
    <View style={styles.container}>{isLoading ? <Loader /> : <SwiperList type="purchases" />}</View>
  );
});

const styles = StyleSheet.create({
  container,
});
