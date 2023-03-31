import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View className="flex-row bg-slate-50 py-2">
      <Text className="text-2xl text-black font-bold flex-1 text-center my-auto py-2">
        Shop
      </Text>
      <TouchableOpacity
        className="justify-end my-auto"
        onPress={() => navigation.navigate('ShopCart')}>
        <Icon name="basket-outline" type="ionicon" color={'#000'} size={40} />
      </TouchableOpacity>
    </View>
  );
}
