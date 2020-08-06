import React from 'react';
import { StyleSheet, View, Image, FlatList, SafeAreaView } from 'react-native';
// Paper
import { Divider, Text, Title, Paragraph , Button, TextInput, Subheading, Headline } from 'react-native-paper';
// MobX
import { inject, observer } from 'mobx-react';
import { when, autorun } from 'mobx';

@inject('store')
@observer
export default class ThirdScreen extends React.Component {

  state = {
    text1 : '',
    text2 : '',
  }
  /**
   * @todo verificare se è corretto aggiungere il istener 'when' e 'autorun' da componentDidMount()
   * invece che in constructor(), perchè se il metodo componentDidMount() è invocato più volte
   * c'è il rischio che lo stesso listener venga istanziato più volte
   */
componentDidMount(){
 
  console.log('componentDidMount() di ThirdScreen');
  /**
  * when() will monitor the function passed as first argument and when it becomes true then it 
  * will execute the function passed as 2th argument.
  * It automatically dispose of itself when triggered so it's only fires one time. 
  * Its a good idea to dispose of it in componentWillUnmount().
  * @todo: write the code to dispose when e autorun
  */
  when(    
        // once...
        () => {return (this.props.store.data.results.length>0)},
        // ... then
        () => {console.log('@@@@@ When count > 0'); this.setState({text1: 'results ' +  this.props.store.data.results.length + ' > 0'});}
      ); 
    
  autorun(() => {
    console.log('##### Autorun count: ' + this.props.store.data.results.length);
    this.setState({text2: 'results ' +  this.props.store.data.results.length});
  } );

}

  render(){
    console.log('Render di ThirdScreen');
 
  return (
    <SafeAreaView style={styles.container}>
      <Headline>Computed Observables</Headline>
      <View style={styles.section1}>
        <Text>{this.props.store.searchedText}</Text> 
        <Text>The 'text' attribute is not observable, so the value printed above will be updated only when others events will call the render() method. In other words, the value may change in the store but the text above can continue to show a previous value.</Text>
      </View>   
      <Divider />
      <Headline>Reactions</Headline>
      <View style={styles.section2}>
      <Text>When: {this.state.text1}</Text> 
      <Text>(it's only fired once so it will never be updated again)</Text> 
      <Text>Autorun: {this.state.text2}</Text> 
      </View>
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60, 
    marginHorizontal: 16,     
    alignItems: 'center',
    justifyContent: 'center',
  },
  section1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },    
  list: {
    flex: 1,
  },  
});
