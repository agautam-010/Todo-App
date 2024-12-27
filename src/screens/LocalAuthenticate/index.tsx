import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {ImageBackground} from 'react-native';

import {Container, View, Button, Typography} from '@components';
import {IMAGES} from '@utils';

import {LocalAuthenticateSreenProps} from './types';
import styles from './styles';

const AuthScreen = ({
  hasAuthentication,
  setAuthentictionType,
  onAuthenticatePress,
}: LocalAuthenticateSreenProps) => {
  return (
    <Container style={styles.screenContainer}>
      <ImageBackground
        source={hasAuthentication ? IMAGES.UNLOCK_BG : IMAGES.LOCK_BG}
        style={[styles.background]}
        resizeMode="center"
      />
      <View style={styles.container}>
        <Typography style={styles.title} text={'Welcome'} />
        <Typography
          style={styles.description}
          text={
            hasAuthentication
              ? 'Authenticate to proceed securely.'
              : 'Set Authentication to proceed.'
          }
        />
        <Button
          testID={
            hasAuthentication ? 'authenticate-button' : 'authenticate-type'
          }
          onPress={
            hasAuthentication ? onAuthenticatePress : setAuthentictionType
          }>
          <Ionicons
            name={
              hasAuthentication ? 'lock-closed-outline' : 'settings-outline'
            }
            size={24}
            color="white"
            style={styles.icon}
          />
          <Typography
            style={styles.buttonText}
            text={hasAuthentication ? 'Authenticate' : 'Go to Settings'}
          />
        </Button>
      </View>
    </Container>
  );
};
export default AuthScreen;
