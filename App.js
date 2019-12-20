import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import MobxExample from './src/MobxExample';
 

const AppNavigator = createStackNavigator({
  Home: {
	screen: MobxExample
  }
});

export default createAppContainer(AppNavigator);