import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { inject, observer } from "mobx-react";

@inject('store')
@observer
export default class FirstSCreen extends React.Component {

  constructor(props){		
    super(props);    
  }

  render(){
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello {this.props.store.name}!</Text>
    </SafeAreaView >
  );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});