import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default function CustomButton({
  text,
  onPress,
  parrentClassNames,
  textClassNames,
}) {
  return (
    <TouchableOpacity className={parrentClassNames} onPress={onPress}>
      <Text
        className={`text-base text-white font-bold text-center ${textClassNames}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
