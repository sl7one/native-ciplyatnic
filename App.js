import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Purchases } from './screens/Purchases';
import { Salles } from './screens/Salles';
import { Orders } from './screens/Orders';
import { Main } from './screens/Main';
import { AddOrder } from './components/AddOrder';
import { theme } from './utils/mainStyles';

const MainStack = createStackNavigator();

const headerOptions = {
  headerStyle: {
    backgroundColor: 'white',
  },
  headerRight: () => <AddOrder />,
  headerShadowVisible: true,
  headerTitleAlign: 'center',
  headerTitleStyle: { fontSize: 24 },
};

const App = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Main">
        <MainStack.Screen
          name="Main"
          component={Main}
          options={{ ...headerOptions, headerShown: false }}
        />
        <MainStack.Screen
          name="Orders"
          options={{
            ...headerOptions,
            headerStyle: {
              backgroundColor: theme.colors.orderLink,
            },
            title: 'Заказы',
          }}
          component={Orders}
        />
        <MainStack.Screen
          name="Purchases"
          options={{
            ...headerOptions,
            headerStyle: {
              backgroundColor: theme.colors.purchaseLink,
            },
            title: 'Закупки',
          }}
          component={Purchases}
        />
        <MainStack.Screen
          name="Salles"
          options={{
            ...headerOptions,
            headerStyle: {
              backgroundColor: theme.colors.salleLink,
            },
            title: 'Продажи',
          }}
          component={Salles}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
