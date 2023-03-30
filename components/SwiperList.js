import { observer } from 'mobx-react-lite';
import moment from 'moment/moment';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ordersStore } from '../store/ordersStore';
import { text, theme } from '../utils/mainStyles';
import Icon from 'react-native-vector-icons/AntDesign';

function SwiperList() {
  const { orders } = ordersStore;

  const listData = orders.map((item, i) => {
    const { _id, active, date, order, total } = item;
    const { buyer, data, food, options } = order;
    const { name, location, phone } = buyer;

    return {
      key: `${i}`,
      text: name,
      date: date,
    };
  });

  const deleteItem = (rowMap, rowKey) => {
    console.log('DELETE ITEM');
  };

  const saleItem = (rowMap, rowKey) => {
    console.log('SALE ITEM');
  };

  const editItem = (rowMap, rowKey) => {
    console.log('EDIT ITEM');
  };

  const onRowDidOpen = rowKey => {
    // console.log(args);
    // console.log('This row opened', rowKey);
  };

  const renderItem = data => {
    return (
      <TouchableHighlight
        style={styles.rowFront}
        activeOpacity={theme.activeOpacity}
        underlayColor={theme.colors.underlayColor}
      >
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Text style={{ ...styles.text, width: '50%' }}>{data.item.text}</Text>
          <Text style={{ ...styles.text, width: '50%', textAlign: 'right' }}>
            {moment(data.item.date).format('D MM / YY')}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={{ ...styles.backRightBtn, ...styles.backRightBtn, ...styles.backLeftBtn }}
        activeOpacity={theme.activeOpacity}
        underlayColor={theme.colors.underlayColor}
        onPress={() => editItem(rowMap, data.item.key)}
      >
        <Icon name="edit" size={24} color={theme.colors.positiveButton} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        activeOpacity={theme.activeOpacity}
        underlayColor={theme.colors.underlayColor}
        onPress={() => deleteItem(rowMap, data.item.key)}
      >
        <Icon name="delete" size={24} color={theme.colors.negativeButton} />
      </TouchableOpacity>
      <TouchableHighlight
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        activeOpacity={theme.activeOpacity}
        underlayColor={theme.colors.underlayColor}
        onPress={() => saleItem(rowMap, data.item.key)}
      >
        <Icon name="wallet" size={24} color={theme.colors.positiveButton} />
      </TouchableHighlight>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={1500}
        onRowDidOpen={onRowDidOpen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text,
  container: {
    backgroundColor: 'white',
    flex: 8,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: theme.colors.borderColor,
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: theme.colors.positiveButton,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backLeftBtn: {
    backgroundColor: 'white',
    borderColor: theme.colors.borderColor,
    borderWidth: 0.5,
    borderBottomWidth: 1,
    // right: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'white',
    borderColor: theme.colors.borderColor,
    borderWidth: 0.5,
    borderBottomWidth: 1,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'white',
    borderColor: theme.colors.borderColor,
    borderWidth: 0.5,
    borderBottomWidth: 1,
    right: 0,
  },
});

export default observer(SwiperList);
