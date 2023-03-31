import { View, Modal, StyleSheet } from 'react-native';
import { DatePickerComponent } from './DatePicker';
import { FormDataInputs } from './FormDataInputs';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { ProductHeader } from './ProductHeader';
import { ProductPicker } from './ProductPicker';
import { ModalButtons } from './ModalButtons';
import { formDataStore } from '../store/formDataStore';
import { text, modalView } from '../utils/mainStyles';
import { observer } from 'mobx-react-lite';

export const EditFormModal = observer(() => {
  const { isExpanded, setIsExpanded, setIsOpenEditForm, handleUpdateOrder, isOpenEditForm } =
    formDataStore;

  const onPressPositiveBtn = () => {
    handleUpdateOrder();
  };

  const onPressNegativeBtn = () => {
    setIsOpenEditForm(false);
  };

  return (
    <>
      <View>
        <Modal animationType="slide" transparent={true} visible={isOpenEditForm}>
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
                positiveBtn={{ title: 'Изменить', fn: onPressPositiveBtn }}
                negativeBtn={{ title: 'Закрыть', fn: onPressNegativeBtn }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
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
