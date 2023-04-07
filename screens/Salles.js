import { View, StyleSheet } from 'react-native';
import { container } from '../utils/mainStyles';
import { ordersStore } from '../store/ordersStore';
import SwiperList from '../components/SwiperList';
import { observer } from 'mobx-react-lite';
import { Loader } from '../components/Loader';

export const Salles = observer(() => {
  const { isLoading } = ordersStore;

  return (
    <View style={styles.container}>{isLoading ? <Loader /> : <SwiperList type="salles" />}</View>
  );
});

const styles = StyleSheet.create({
  container,
});
