import React from 'react';
import {View, Text, Image} from 'react-native';
import {calculateItemDiscountedPrice} from '../helpers/helpers';
import Theme from '../style/Theme';

export default function BasketItem({item}) {
  const price = (item.unitPrice * item.quantity).toFixed(2);
  const discountedPrice = calculateItemDiscountedPrice(item).toFixed(2);

  return (
    <View
      className="bg-slate-50 rounded-xl mt-4 py-2 mx-2"
      style={Theme.shadow}>
      <View className="flex-row">
        <View className="p-2">
          <Image
            source={item.img}
            style={{width: 90, height: 90}}
            className="rounded-2xl"
          />
        </View>

        <View className="px-2 ml-2 my-auto">
          <Text className="text-black text-base">
            Name: <Text className="font-bold">{item.name}</Text>
          </Text>
          <Text className="text-black text-base">
            Quantity: <Text className="font-bold">{item.quantity}</Text>
          </Text>
          <Text className="text-black text-base">
            Price: <Text className="font-bold">{price}£</Text>
          </Text>
          {discountedPrice !== '0.00' && (
            <Text className="text-black text-base text-emerald-600">
              Price with discount:{' '}
              <Text className="font-bold">{discountedPrice}£</Text>
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
