import React, {useState, createContext} from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import ShopCartScreen from './src/screens/ShopCartScreen';
import FinalizeOrderScreen from './src/screens/FinalizeOrderScreen';

const Stack = createNativeStackNavigator();
const ShopContext = createContext({});

function App() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const getItemQuantity = (id: number) => {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  };

  const increaseItemQuantity = (id: number) => {
    setCartItems(currentCartItems => {
      const item = currentCartItems.find(item => item.id === id);

      if (item == null) return [...currentCartItems, {id, quantity: 1}];
      else {
        return currentCartItems.map(item => {
          if (item.id === id) return {...item, quantity: item.quantity + 1};
          else return item;
        });
      }
    });
  };

  const decreaseItemQuantity = (id: number) => {
    setCartItems(currentCartItems => {
      const item = currentCartItems.find(item => item.id === id);

      if (item.quantity === 1)
        return currentCartItems.filter(item => item.id !== id);
      else {
        return currentCartItems.map(item => {
          if (item.id === id) return {...item, quantity: item.quantity - 1};
          else return item;
        });
      }
    });
  };

  const removeItem = (id: number) => {
    setCartItems(currentCartItems => {
      return currentCartItems.filter(item => item.id !== id);
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ShopContext.Provider
        value={{
          cartItems,
          setCartItems,
          getItemQuantity,
          increaseItemQuantity,
          decreaseItemQuantity,
          removeItem,
        }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ShopCart"
              component={ShopCartScreen}
              options={{
                headerShown: false,
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="FinalizeOrder"
              component={FinalizeOrderScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ShopContext.Provider>
    </SafeAreaView>
  );
}

export {ShopContext};
export default App;
