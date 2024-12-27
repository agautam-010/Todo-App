import React from 'react';
import {View, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {FlatList} from '../EnhancedComponent/FlatList';

import {THEME, UTILS, Types, GLOBAL_STYLE} from '@utils';
import {styles} from './styles';

// Container component for layout management
export const Container = ({
  style,
  children,
  scroll,
  safearea = true,
  barColor = THEME.COLORS.white,
  higherChilds = undefined,
}: Types.ContainerProps) => {
  const body = scroll ? (
    <FlatList
      data={null}
      renderItem={null}
      ListHeaderComponent={<>{children}</>} // Render children as header
      contentContainerStyle={[styles.scrollView]}
    />
  ) : (
    <View style={GLOBAL_STYLE.container}>{children}</View> // Non-scrollable content
  );

  return (
    <View style={[styles.container, style]}>
      <SafeAreaView
        style={styles.flex1}
        edges={{
          top: safearea ? 'additive' : 'off', // Adjust SafeAreaView for the top edge
          bottom: !scroll ? 'additive' : 'off', // Adjust SafeAreaView for the bottom edge
        }}>
        <View style={GLOBAL_STYLE.container}>
          {body}
          {higherChilds}
        </View>
      </SafeAreaView>
      <StatusBar
        barStyle={`${UTILS.getStatusBarStyle(barColor)}`} // Dynamic status bar style
        backgroundColor={barColor}
      />
    </View>
  );
};

// Exporting additional layout components
export {Wrapper} from './Wrapper';
export {Row} from './Row';
export {Card} from './Card';
