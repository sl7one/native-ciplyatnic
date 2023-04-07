import { observer } from 'mobx-react-lite';
import { View, TouchableHighlight, Text, StyleSheet, Modal } from 'react-native';
import { modalNumbersStore } from '../store/modalNumbersStore';
import { text } from '../utils/mainStyles';
import { NumbersList } from './NumbersList';

export const NumericPickerModal = observer(() => {
  const { number, setIsOpenCount, isOpenCount } = modalNumbersStore;

  return (
    <Modal animationType="slide" transparent={true} visible={isOpenCount}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.currentNumber}>
            <Text style={{ ...styles.text, fontSize: 30 }}>{!number ? 0 : number}</Text>
          </View>
          <NumbersList />
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.9}
            underlayColor="rgba(0,0,0,0.05)"
            onPress={() => setIsOpenCount(false)}
          >
            <Text style={styles.text}>Закрыть</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  text,
  currentNumber: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0, 0.05)',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-end',
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
