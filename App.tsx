import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import ShopCartScreen from './src/screens/ShopCartScreen';
import FinalizeOrderScreen from './src/screens/FinalizeOrderScreen';
import {ShopContext, ShopProvider} from './src/context/ShopContext';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ShopProvider>
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
              options={{headerShown: false, presentation: 'modal'}}
            />
            <Stack.Screen
              name="FinalizeOrder"
              component={FinalizeOrderScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ShopProvider>
    </SafeAreaView>
  );
}

export {ShopContext};
export default App;
