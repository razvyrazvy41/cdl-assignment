import React from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Header from '../components/Header';
import ShopItem from '../components/ShopItem';
import CustomButton from '../components/CustomButton';
import {products} from '../data/data';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <View className="flex-1 px-4 bg-white">
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            const isLastItem = index === products.length - 1;
            return <ShopItem item={item} isLastItem={isLastItem} />;
          }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            return (
              <CustomButton
                parrentClassNames={'bg-emerald-500 rounded-xl mb-5 py-3 mx-2'}
                onPress={() => navigation.navigate('ShopCart')}
                text={'Show basket'}
              />
            );
          }}
        />
      </View>
    </>
  );
}
