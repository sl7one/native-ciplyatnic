import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { container, text, theme } from '../utils/mainStyles';
import { categoriesStore } from '../store/categoriesStore';
import { Loader } from '../components/Loader';
import { ordersStore } from '../store/ordersStore';

export const Main = observer(({ navigation }) => {
  const { getAllCategories, isLoading: isLoadingCategories } = categoriesStore;
  const {
    getAllOrders,
    getAllPurchaseOrders,
    getAllSalledOrders,
    isLoading: isLoadingData,
  } = ordersStore;

  useEffect(() => {
    getAllCategories();
    getAllOrders();
    getAllPurchaseOrders();
    getAllSalledOrders();
  }, []);

  if (isLoadingCategories) {
    return <Loader title="Подождите, загружаем интерфейс..." />;
  }
  if (isLoadingData) {
    return <Loader />;
  }

  return (
    <View
      style={{
        ...styles.container,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <View>
        <TouchableOpacity
          style={{ ...styles.btn, backgroundColor: theme.colors.orderLink }}
          underlayColor={theme.colors.underlayColor}
          activeOpacity={theme.activeOpacity}
          onPress={() => navigation.navigate('Orders')}
        >
          <Text style={styles.text}>Заказы</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.btn, backgroundColor: theme.colors.purchaseLink }}
          underlayColor={theme.colors.underlayColor}
          activeOpacity={theme.activeOpacity}
          onPress={() => navigation.navigate('Purchases')}
        >
          <Text style={styles.text}>Закупки</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.btn, backgroundColor: theme.colors.salleLink }}
          activeOpacity={theme.activeOpacity}
          underlayColor={theme.colors.underlayColor}
          onPress={() => navigation.navigate('Salles')}
        >
          <Text style={styles.text}>Продажи</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container,
  text,
  btn: {
    padding: 25,
    alignItems: 'center',
  },
});
