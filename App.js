import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Navigator
import { NavigationContainer, DarkTheme as DarkThemeNav, DefaultTheme as DefaultThemeNav} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Paper
import { Text, View, DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';
// MobX Provider and store
import { Provider } from 'mobx-react';
import store from './src/stores/Store';
// Screens
import FirstScreen from './src/screens/FirstScreen';
import SecondScreen from './src/screens/SecondScreen';
import ThirdScreen from './src/screens/ThirdScreen';

const AppTheme = {
  ...DefaultTheme,
  dark: false, 
  mode: 'exact', // ('adaptive' | 'exact') (adaptive where we follow Material design guidelines)
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#3498db', // primary color for your app, usually your brand color.
    // accent: '#f1c40f', // secondary color for your app which complements the primary color.
    primary: 'red',
	  accent: 'rgb(259, 247, 0)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'blue',
  },
};

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default class App extends React.Component {	 

  getThirdScreen = () => {
    return (
      <ThirdScreen theme={AppTheme} />
    );
  }

	render() {		
	  return (     
    <Provider store={store}>      
    <PaperProvider theme={AppTheme}>
    <NavigationContainer theme={AppTheme}>
    {/*<Tab.Navigator tabBar={props => <MyTabBar {...props} />}>*/}
    <Tab.Navigator style={{color: 'green' }}>
      <Tab.Screen name="Home" component={FirstScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        />
      <Tab.Screen name="Basic" component={SecondScreen} options={{
          tabBarLabel: 'Basic',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen name="Advanced" component={this.getThirdScreen}options={{
          tabBarLabel: 'Advanced',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    </NavigationContainer>
    </PaperProvider>    
    </Provider>
  );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
