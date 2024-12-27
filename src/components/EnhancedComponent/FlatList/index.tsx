import React, {forwardRef} from 'react';
import {FlatList as RNFlatList, Text, View} from 'react-native';

import {Types} from '@utils';
import styles from './styles';

type FlatListTypes = RNFlatList['props'] & Types.FlatListExtraProps;

// Custom FlatList component
const FlatList = forwardRef((rest: FlatListTypes, ref) => {
  return (
    <RNFlatList
      ref={ref}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={
        (item, index) => (item?.id ? item.id.toString() : `item_${index}`) // Unique key for each item. if id is present in object then id else fall to current index
      }
      ListEmptyComponent={() => {
        {
          return rest.emptyTitle || rest.emptyMsg ? (
            <View>
              <Text style={styles.flatlistEmptyDataTitle}>
                {/* Fallback for empty data title */}
                {rest?.emptyTitle || 'Empty'}
              </Text>
              <Text style={styles.flatlistEmptyDataMsg}>
                {/* Fallback for empty data message */}
                {rest?.emptyMsg || 'No records found!'}{' '}
              </Text>
            </View>
          ) : null;
        }
      }}
      {...rest}
    />
  );
});
export {FlatList};
