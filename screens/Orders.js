import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList } from 'react-native';
import { Footer } from '../components/Footer';
import { Item } from '../components/Item';
import { text, container } from '../utils/mainStyles';
import { ordersStore } from '../store/ordersStore';
import { Loader } from '../components/Loader';
import { SwipeListView } from 'react-native-swipe-list-view';
import SwiperList from '../components/SwiperList';

export const Orders = observer(() => {
  const { orders, isLoading, getAll } = ordersStore;

  useEffect(() => {
    if (orders.length > 0) return;
    getAll();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <SwiperList />
      {/* <SafeAreaView style={styles.viewArea}>
        <FlatList
          style={{ flex: 1 }}
          data={orders}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item._id}
        />
      </SafeAreaView> */}
      <Footer title="Footer" />
    </View>
  );
});

const styles = StyleSheet.create({
  container,
  viewArea: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text,
});
