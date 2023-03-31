import React, {useEffect, useState, useContext} from 'react';
import {ShopContext} from '../../App';
import {View, Text, Image} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';

export default function FinalizeOrderScreen() {
  const navigation = useNavigation();
  const {setCartItems} = useContext(ShopContext);
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCountDown(prevCountDown => prevCountDown - 1);
    }, 1000);

    if (countDown === 0) {
      setCartItems([]);
      navigation.dispatch(StackActions.replace('Home'));
    }

    return () => clearTimeout(timeout);
  }, [countDown]);

  return (
    <View className="flex-1 px-4 bg-white justify-center">
      <View className="mx-auto">
        <Image
          source={require('../assets/images/checkbox.webp')}
          style={{width: 150, height: 150, resizeMode: 'contain'}}
        />
      </View>
      <Text className="text-center text-black text-2xl">
        Your order has been placed!
      </Text>
      <Text className="text-center text-black text-xl mt-4">
        You will be redirected to home screen in {countDown} seconds
      </Text>
    </View>
  );
}
