import { observer } from 'mobx-react-lite';
import moment from 'moment/moment';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ordersStore } from '../store/ordersStore';
import { text, theme } from '../utils/mainStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import { formDataStore } from '../store/formDataStore';

function SwiperList({ type }) {
  const options = type => {
    switch (type) {
      case 'orders':
        const { orders } = ordersStore;
        return {
          leftOpenValue: 75,
          rightOpenValue: -150,
          editBtn: true,
          deleteBtn: true,
          walletBtn: true,
          list: orders,
        };
      case 'purchases':
        const { purchasesOrders } = ordersStore;
        return {
          leftOpenValue: 75,
          rightOpenValue: 0,
          editBtn: true,
          deleteBtn: false,
          walletBtn: false,
          list: purchasesOrders,
        };
      case 'salles':
        const { salledOrders } = ordersStore;
        return {
          leftOpenValue: 0,
          rightOpenValue: -75,
          editBtn: false,
          deleteBtn: true,
          walletBtn: false,
          list: salledOrders,
        };
      default:
        return null;
    }
  };

  const listData = [...options(type).list]
    .sort(({ date: dateA }, { date: dateB }) => Date.parse(dateB) - Date.parse(dateA))
    .map((item, i) => {
      const { _id, active, date, order } = item;
      const { buyer, saller, data, food, options, total } = order;
      const person = buyer || saller;
      const { name, location, phone } = person;

      return {
        key: `${_id}`,
        name,
        date,
        phone,
        location,
        data,
        food,
        options,
        total,
      };
    });

  const deleteItem = async (_, rowKey) => {
    const { removeOrder, updateSalledOrder } = ordersStore;
    const [item] = options(type).list.filter(el => el._id === rowKey);
    type === 'orders' ? await removeOrder(item._id) : await updateSalledOrder(item._id);
  };

  const saleItem = async (_, rowKey) => {
    const { salleOrder } = ordersStore;
    const [item] = options(type).list.filter(el => el._id === rowKey);
    await salleOrder(item._id);
  };

  const editItem = (_, rowKey) => {
    const { setIsOpenEditForm } = formDataStore;
    const [item] = options(type).list.filter(el => el._id === rowKey);
    setIsOpenEditForm(true, item);
  };

  const renderItem = data => {
    return (
      <TouchableHighlight
        style={styles.rowFront}
        activeOpacity={theme.activeOpacity}
        underlayColor={theme.colors.underlayColor}
      >
        <View>
          <View style={styles.headerItem}>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Text style={{ ...styles.text }}>{data.item.name}</Text>
              <Text style={{ ...styles.text, fontWeight: 600 }}>{data.item.phone}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
              <Text style={{ ...styles.text }}>{moment(data.item.date).format('DD MM / YY')}</Text>
              <Text style={{ ...styles.text, fontWeight: 600 }}>{data.item.location}</Text>
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <View style={{ marginTop: 5 }}>
              {data.item.data.map(el => (
                <View style={{ flexDirection: 'row' }} key={el.type}>
                  <Text style={{ ...styles.text, flex: 2, fontSize: 14 }}>{el.type}</Text>
                  <Text style={{ ...styles.text, flex: 0.5, fontSize: 14, textAlign: 'right' }}>
                    {el.count} шт
                  </Text>
                  <Text style={{ ...styles.text, flex: 0.5, fontSize: 14, textAlign: 'right' }}>
                    {el.price} грн
                  </Text>
                </View>
              ))}
            </View>

            {!!data.item.food && (
              <View style={{ marginTop: 5 }}>
                {data.item.food.map(el => (
                  <View style={{ flexDirection: 'row' }} key={el.type}>
                    <Text style={{ ...styles.text, flex: 2, fontSize: 14 }}>{el.type}</Text>
                    <Text style={{ ...styles.text, flex: 0.5, fontSize: 14, textAlign: 'right' }}>
                      {el.count} шт
                    </Text>
                    <Text style={{ ...styles.text, flex: 0.5, fontSize: 14, textAlign: 'right' }}>
                      {el.price} грн
                    </Text>
                  </View>
                ))}
              </View>
            )}
            {!!data.item.options && (
              <View style={{ marginTop: 5 }}>
                {data.item.options.map(el => (
                  <View style={{ flexDirection: 'row' }} key={el.type}>
                    <Text style={{ ...styles.text, flex: 2, fontSize: 14 }}>{el.type}</Text>
                    <Text style={{ ...styles.text, flex: 0.5, fontSize: 14, textAlign: 'right' }}>
                      {el.count} шт
                    </Text>
                    <Text style={{ ...styles.text, flex: 0.5, fontSize: 14, textAlign: 'right' }}>
                      {el.price} грн
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 10 }}>
            <Text style={{ ...styles.text, fontWeight: 600 }}>Итого</Text>
            <Text style={{ ...styles.text, fontWeight: 600, color: 'red' }}>
              {data.item.total} грн
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      {options(type).editBtn && (
        <TouchableOpacity
          style={{ ...styles.btn, left: 0 }}
          activeOpacity={theme.activeOpacity}
          underlayColor={theme.colors.underlayColor}
          onPress={() => editItem(rowMap, data.item.key)}
        >
          <Icon name="edit" size={24} color={theme.colors.positiveButton} />
        </TouchableOpacity>
      )}
      {options(type).deleteBtn && (
        <TouchableOpacity
          style={{ ...styles.btn, right: type === 'orders' ? 75 : 0 }}
          activeOpacity={theme.activeOpacity}
          underlayColor={theme.colors.underlayColor}
          onPress={() => deleteItem(rowMap, data.item.key)}
        >
          <Icon name="delete" size={24} color={theme.colors.negativeButton} />
        </TouchableOpacity>
      )}
      {options(type).walletBtn && (
        <TouchableOpacity
          style={{ ...styles.btn, right: 0 }}
          activeOpacity={theme.activeOpacity}
          underlayColor={theme.colors.underlayColor}
          onPress={() => saleItem(rowMap, data.item.key)}
        >
          <Icon name="wallet" size={24} color={theme.colors.positiveButton} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={options(type).leftOpenValue}
        rightOpenValue={options(type).rightOpenValue}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={1500}
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
    flex: 1,
    backgroundColor: 'white',
    borderBottomColor: theme.colors.borderColor,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: theme.colors.positiveButton,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
  },
  btn: {
    height: '100%',
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    backgroundColor: 'white',
    borderColor: theme.colors.borderColor,
    borderWidth: 0.5,
    borderBottomWidth: 1,
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 10,
  },
});

export default observer(SwiperList);
