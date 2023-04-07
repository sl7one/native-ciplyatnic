import Icon from 'react-native-vector-icons/AntDesign';
import { Modal, StyleSheet, TouchableHighlight, View } from 'react-native';
import { text, modalView, theme } from '../utils/mainStyles';
import { ModalButtons } from './ModalButtons';
import { DatePickerComponent } from './DatePicker';
import { FormDataInputs } from './FormDataInputs';
import { ProductPicker } from './ProductPicker';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { ProductHeader } from './ProductHeader';
import { observer } from 'mobx-react-lite';
import { formDataStore } from '../store/formDataStore';
import ToastManager from 'toastify-react-native';
import { NumericPickerModal } from './NumericPickerModal';
import { ProductPickerModal } from './ProductPickerModal';
import { EditFormModal } from './EditFormModal';

export const AddOrder = observer(() => {
  const { isExpanded, setIsExpanded, setIsOpenAddItem, handleSubmitAddOrder, isOpenAddOrder } =
    formDataStore;

  const onPressPositiveBtn = () => {
    handleSubmitAddOrder();
  };

  const onPressNegativeBtn = () => {
    setIsOpenAddItem(false);
  };

  return (
    <>
      <TouchableHighlight
        style={{ marginRight: 20 }}
        underlayColor={theme.colors.underlayColor}
        activeOpacity={theme.colors.activeOpacity}
        onPress={() => setIsOpenAddItem(true)}
      >
        <Icon name="plussquareo" size={24} color={theme.colors.positiveButton} />
      </TouchableHighlight>
      <Modal animationType="slide" transparent={true} visible={isOpenAddOrder}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <DatePickerComponent />
            <FormDataInputs />

            <Collapse isExpanded={isExpanded.poultry} onToggle={() => setIsExpanded('poultry')}>
              <CollapseHeader>
                <ProductHeader title="Добавить птицу" type="poultry" />
              </CollapseHeader>
              <CollapseBody>
                <ProductPicker type="poultry" />
              </CollapseBody>
            </Collapse>
            <Collapse isExpanded={isExpanded.food} onToggle={() => setIsExpanded('food')}>
              <CollapseHeader>
                <ProductHeader title="Добавить корм" type="food" />
              </CollapseHeader>
              <CollapseBody>
                <ProductPicker type="food" />
              </CollapseBody>
            </Collapse>
            <Collapse isExpanded={isExpanded.options} onToggle={() => setIsExpanded('options')}>
              <CollapseHeader>
                <ProductHeader title="Дополнительно" type="options" />
              </CollapseHeader>
              <CollapseBody>
                <ProductPicker type="options" />
              </CollapseBody>
            </Collapse>

            <ModalButtons
              positiveBtn={{ title: 'Добавить', fn: onPressPositiveBtn }}
              negativeBtn={{ title: 'Закрыть', fn: onPressNegativeBtn }}
            />
            <ToastManager
              position="center"
              duration={1500}
              backdropColor="black"
              backdropOpacity={0.2}
            />
          </View>
        </View>
      </Modal>
      <NumericPickerModal />
      <ProductPickerModal />
      <EditFormModal />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toastify: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView,
  text,
});
