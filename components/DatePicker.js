import { observer } from 'mobx-react-lite';
import { formDataStore } from '../store/formDataStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Text, StyleSheet, View } from 'react-native';
import { text, theme } from '../utils/mainStyles';
import { TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export const DatePickerComponent = observer(() => {
  const { setIsOpenDatePicker, currentDate, isOpenDatePicker, handleSelect } = formDataStore;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Дата заказа: {moment(currentDate).format('D MM / YY')}</Text>
        <TouchableHighlight
          underlayColor={theme.colors.underlayColor}
          activeOpacity={theme.activeOpacity}
          onPress={() => setIsOpenDatePicker(true)}
        >
          <Icon name="calendar" size={24} color={theme.colors.positiveButton} />
        </TouchableHighlight>
      </View>
      {isOpenDatePicker && (
        <DateTimePicker
          mode={'date'}
          display={'date'}
          value={currentDate}
          onChange={handleSelect}
        />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text,
});
