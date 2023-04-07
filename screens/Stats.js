import { observer } from 'mobx-react-lite';
import { StyleSheet, View, Text } from 'react-native';
import { ordersStore } from '../store/ordersStore';
import { theme, text } from '../utils/mainStyles';

export const Stats = observer(() => {
  const { orders } = ordersStore;
  let totalSumm = 0;
  let totalPoultry = [];
  let totalFood = [];
  let totalOptions = [];
  let totalPoultryCount = 0;
  let totalFoodCount = 0;

  orders.forEach(({ order }) => {
    const { total, data, food, options } = order;
    totalSumm += total;
    totalPoultry = [...totalPoultry, ...data];
    totalFood = [...totalFood, ...food];
    totalOptions = [...totalOptions, ...options];
  });

  const poultryStats = Object.entries(
    totalPoultry.reduce((acc, { type, count }) => {
      return { ...acc, [type]: !acc[type] ? count : acc[type] + count };
    }, {})
  );
  const foodStats = Object.entries(
    totalFood.reduce((acc, { type, count }) => {
      return { ...acc, [type]: !acc[type] ? count : acc[type] + count };
    }, {})
  );
  const optionsStats = Object.entries(
    totalOptions.reduce((acc, { type, count }) => {
      return { ...acc, [type]: !acc[type] ? count : acc[type] + count };
    }, {})
  );

  return (
    <View style={{ flex: 1, padding: 10, paddingRight: 20 }}>
      <View style={{ marginTop: 10 }}>
        <Text style={{ ...styles.text, marginBottom: 10 }}>Птица</Text>
        <View style={styles.list}>
          {poultryStats.map(([name, count]) => {
            totalPoultryCount += count;
            return (
              <View key={name} style={{ flexDirection: 'row', width: '100%', paddingLeft: 20 }}>
                <View style={{ flex: 5, alignItems: 'flex-start' }}>
                  <Text>{name}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={{ fontWeight: 600 }}>{count} </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 5 }}>
                  <Text>шт</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ flexDirection: 'row', width: '100%', paddingLeft: 20, marginTop: 10 }}>
          <View style={{ ...styles.text, flex: 5, alignItems: 'flex-start' }}>
            <Text style={styles.text}>Итого</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={{ ...styles.text, color: 'red', marginLeft: 10, fontWeight: 600 }}>
              {totalPoultryCount}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 5 }}>
            <Text style={styles.text}>шт</Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={{ ...styles.text, marginBottom: 10 }}>Корм</Text>
        <View style={styles.list}>
          {foodStats.map(([name, count]) => {
            totalFoodCount += count;
            return (
              <View key={name} style={{ flexDirection: 'row', width: '100%', paddingLeft: 20 }}>
                <View style={{ flex: 5, alignItems: 'flex-start' }}>
                  <Text>{name}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={{ fontWeight: 600 }}>{count} </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 5 }}>
                  <Text>шт</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ flexDirection: 'row', width: '100%', paddingLeft: 20, marginTop: 10 }}>
          <View style={{ ...styles.text, flex: 5, alignItems: 'flex-start' }}>
            <Text style={styles.text}>Итого</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={{ ...styles.text, color: 'red', marginLeft: 10, fontWeight: 600 }}>
              {totalFoodCount}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 5 }}>
            <Text style={styles.text}>шт</Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={{ ...styles.text, marginBottom: 10 }}>Дополнительно</Text>
        <View style={styles.list}>
          {optionsStats.map(([name, count]) => {
            return (
              <View key={name} style={{ flexDirection: 'row', width: '100%', paddingLeft: 20 }}>
                <View style={{ flex: 5, alignItems: 'flex-start' }}>
                  <Text>{name}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={{ fontWeight: 600 }}>{count} </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 5 }}>
                  <Text>шт</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={{ ...styles.text, marginBottom: 10 }}>Общие</Text>
        <View style={styles.list}>
          <View style={{ flexDirection: 'row', width: '100%', paddingLeft: 20 }}>
            <View style={{ flex: 5, alignItems: 'flex-start' }}>
              <Text>Всего заказов</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: 600, color: 'red' }}>{orders.length} </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 5 }}>
              <Text>шт</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', paddingLeft: 20 }}>
            <View style={{ flex: 5, alignItems: 'flex-start' }}>
              <Text>На сумму</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: 600, color: 'red' }}>{totalSumm} </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 5 }}>
              <Text>грн</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  text,
  list: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.borderColor,
  },
});
