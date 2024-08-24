import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import Stacknav from './src/Routenavigation';
import { enableScreens } from 'react-native-screens';

enableScreens();
export default function App() {
 
  return (
    <NavigationContainer>
      <Stacknav />

    </NavigationContainer>
  );
}
