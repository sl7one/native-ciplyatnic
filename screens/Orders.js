import { observer } from 'mobx-react-lite';
import { StyleSheet, View } from 'react-native';
import { Footer } from '../components/Footer';
import { container } from '../utils/mainStyles';
import { ordersStore } from '../store/ordersStore';
import { Loader } from '../components/Loader';
import SwiperList from '../components/SwiperList';
import { EditFormModal } from '../components/EditFormModal';
import { NumericPickerModal } from '../components/NumericPickerModal';
import { ProductPickerModal } from '../components/ProductPickerModal';

export const Orders = observer(() => {
  const { isLoading } = ordersStore;

  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <SwiperList type="orders" />
            <Footer title="Footer" />
          </>
        )}
      </View>

      <NumericPickerModal />
      <ProductPickerModal />
      <EditFormModal />
    </>
  );
});

const styles = StyleSheet.create({
  container,
});
