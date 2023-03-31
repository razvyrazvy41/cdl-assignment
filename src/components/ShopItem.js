import React, {useContext} from 'react';
import {ShopContext} from '../../App';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import Theme from '../style/Theme';

export default function ShopItem({item, isLastItem}) {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
  } = useContext(ShopContext);

  const itemQuantity = getItemQuantity(item.id);

  return (
    <View
      className={`${
        isLastItem && 'mb-6'
      } mt-5 bg-slate-50 flex-row rounded-2xl mx-2`}
      style={Theme.shadow}>
      <View style={[{flex: 0.3, padding: 16}]} className="my-auto">
        <Image
          source={item.img}
          style={{width: 90, height: 90}}
          className="rounded-2xl"
        />
      </View>
      <View style={{flex: 0.7}} className="justify-around">
        <Text className="text-base text-black font-bold">{item.name}</Text>
        {item.hasSpecialPrice && (
          <Text className="text-sm italic text-emerald-600">
            This product has an offer! Buy {item.itemsPerSpecialPrice} for £
            {item.specialPrice} his product has an offer!
          </Text>
        )}
        <View className="flex-row justify-between">
          <Text className="text-base text-black font-bold my-auto">
            £{item.unitPrice.toFixed(2)}
          </Text>
          <View className="flex-row">
            <TouchableOpacity
              activeOpacity={itemQuantity > 0 ? 0.2 : 1}
              onPress={() => {
                if (itemQuantity > 0) decreaseItemQuantity(item.id);
              }}>
              <Icon
                name="remove-circle-outline"
                type="ionicon"
                color={itemQuantity > 0 ? '#000' : '#c5c5c5'}
                size={30}
              />
            </TouchableOpacity>
            <Text className="my-auto font-bold text-black px-3">
              {itemQuantity}
            </Text>
            <TouchableOpacity onPress={() => increaseItemQuantity(item.id)}>
              <Icon
                name="add-circle-outline"
                type="ionicon"
                color={'#000'}
                size={30}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="mr-1"
            activeOpacity={itemQuantity > 0 ? 0.2 : 1}
            onPress={() => {
              if (itemQuantity > 0) removeItem(item.id);
            }}>
            <Icon
              name="trash-outline"
              type="ionicon"
              color={itemQuantity > 0 ? '#000' : '#c5c5c5'}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
