import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { container } from '../utils/mainStyles';
import { ordersStore } from '../store/ordersStore';
import SwiperList from '../components/SwiperList';
import { observer } from 'mobx-react-lite';
import { Loader } from '../components/Loader';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/mainStyles';

export const Salles = observer(({ navigation }) => {
  const { isLoading } = ordersStore;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SwiperList type="salles" />
          <TouchableHighlight
            style={styles.btn}
            underlayColor={theme.colors.underlayColor}
            activeOpacity={theme.colors.activeOpacity}
            onPress={() => {
              navigation.navigate('Stats', { type: 'salles' });
            }}
          >
            <Ionicons name="stats-chart" size={35} color={theme.colors.positiveButton} />
          </TouchableHighlight>
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container,
  btn: {
    width: '100%',
    height: 60,
    backgroundColor: theme.colors.salleLink,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
