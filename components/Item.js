import moment from 'moment/moment';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { text } from '../utils/mainStyles';

export const Item = ({ item }) => {
  const { _id, active, date, order, total } = item;

  const { buyer, data, food, options } = order;
  const { name, location, phone } = buyer;
  // console.log(data);
  return (
    <View style={styles.item}>
      <View style={styles.itemHeader}>
        <Text style={{ ...styles.text, width: '50%' }}>{name}</Text>
        <Text style={{ ...styles.text, width: '50%', textAlign: 'right' }}>
          {moment(date).format('D MM / YY')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.05)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 5,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text,
});
