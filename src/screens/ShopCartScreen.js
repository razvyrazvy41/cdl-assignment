import React, {useContext} from 'react';
import {ShopContext} from '../../App';
import {View, Text, Image, FlatList, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {products} from '../data/data';
import {calculateTotalPriceOfBasket} from '../helpers/helpers';
import BasketItem from '../components/BasketItem';
import CustomButton from '../components/CustomButton';

export default function ShopCartScreen() {
  const navigation = useNavigation();
  const {cartItems} = useContext(ShopContext);

  const itemsInBasket = cartItems
    .map(cartItem => {
      const item = products.find(product => product.id === cartItem.id);
      return item !== undefined ? {...item, quantity: cartItem.quantity} : null;
    })
    .filter(item => item !== null);

  const totalPrice = calculateTotalPriceOfBasket(itemsInBasket).toFixed(2);

  return (
    <View className="flex-1 px-4 bg-white">
      {itemsInBasket.length > 0 ? (
        <FlatList
          data={itemsInBasket}
          keyExtractor={item => item.id}
          renderItem={({item}) => <BasketItem item={item} />}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            return (
              <>
                <View>
                  <Text className="text-xl font-bold text-black ml-2 mt-3">
                    Total Price: {totalPrice}£
                  </Text>
                </View>
                <View className="flex-row justify-between my-3">
                  <CustomButton
                    parrentClassNames="flex-1 bg-white border border-2 border-emerald-500 rounded-xl mx-2 py-3"
                    textClassNames="text-emerald-500"
                    text={'Go Back'}
                    onPress={() => navigation.goBack()}
                  />
                  <CustomButton
                    parrentClassNames="flex-1 bg-emerald-500 rounded-xl mx-2 py-3"
                    text={'Finalize Order'}
                    onPress={() => navigation.navigate('FinalizeOrder')}
                  />
                </View>
              </>
            );
          }}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Image
            source={require('../assets/images/empty-cart.png')}
            style={{width: 150, height: 150, resizeMode: 'contain'}}
          />
          <Text className="text-xl text-black font-bold mt-5">
            Your basket is empty
          </Text>
          <CustomButton
            parrentClassNames="bg-emerald-500 rounded-xl py-3 my-3 w-4/5"
            text={'Go Back'}
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
    </View>
  );
}
