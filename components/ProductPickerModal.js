import { observer } from 'mobx-react-lite';
import { View, StyleSheet, Modal } from 'react-native';
import { modalProductStore } from '../store/modalProductStore';
import { text } from '../utils/mainStyles';
import { ProductList } from './ProductList';

export const ProductPickerModal = observer(() => {
  const { isOpenProduct } = modalProductStore;

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={isOpenProduct}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ProductList />
          </View>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  text,
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
});
