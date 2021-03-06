import React from 'react';
import { StyleSheet, View, Image, FlatList, SafeAreaView } from 'react-native';
// Paper
import { Divider, Text, Title, Paragraph , Button, TextInput, Subheading, Headline } from 'react-native-paper';
// MobX
import { inject, observer } from 'mobx-react';
import { when, autorun } from 'mobx';
import { ScrollView } from 'react-native-gesture-handler';

@inject('store')
@observer
export default class ThirdScreen extends React.Component {

  state = {
    buttonEnabled: true,
    text1 : '',
    text2 : '',
  }
  /**
   * @todo verificare se è corretto aggiungere il istener 'when' e 'autorun' da componentDidMount()
   * invece che in constructor(), perchè se il metodo componentDidMount() è invocato più volte
   * c'è il rischio che lo stesso listener venga istanziato più volte. 
   * Eventualmente si potrebbe aggiungere una guardia per istanziare i listeners una sola volta indipendentemente dalle chiamate a componentDidMount()
   */
componentDidMount(){
  console.log('componentDidMount() di ThirdScreen');
  console.log('theme: ' + JSON.stringify(this.props));
  /**
  * when() will monitor the function passed as first argument and when it becomes true then it 
  * will execute the function passed as 2th argument.
  * It automatically dispose of itself when triggered so it's only fires one time. 
  * Its a good idea to dispose of it in componentWillUnmount().
  */
 this.disposeTheWhen = when(    
        // once...
        () => {return (this.props.store.data.results.length>0)},
        // ... then
        () => {console.log('@@@@@ When count > 0'); this.setState({text1: this.props.store.data.results.length + ' > 0'});}
      ); 
    
this.disposeTheAutorun = autorun(() => {
    console.log('##### Autorun count: ' + this.props.store.data.results.length);
    this.setState({text2: this.props.store.data.results.length});
  } );

}

componentWillUnmount() {
  console.log('componentWillUnmount()...disposing autorun() and when()');
  this.dispose();
}

onButtoPress = () => {
  this.dispose();
  this.setState({buttonEnabled: false});
}

dispose = () => {
  console.log('Disposing mobX reaction listeners...');
  this.disposeTheAutorun();
  this.disposeTheWhen();
}

  render(){
    console.log('Render di ThirdScreen');
 
  return (
    <SafeAreaView style={styles.container1}>
      <ScrollView style={styles.listView} contentContainerStyle={styles.container2}>
      <Headline>Computed Observables</Headline>
      <View style={styles.section1}>
        <Text>@computed searchedText(): {this.props.store.searchedText}</Text> 
        <Text>text: {this.props.store.text}</Text>        
        <Text>The 'text' attribute is not observable, so the value printed above will be updated only when others events will call the render() method. In other words, the value may change in the store but the text above can continue to show a previous value. This is just to show a wrong usage of a computed observable.</Text>
      </View>   
      <Divider theme={{height: 10 ,  backgroundColor: 'red', color: 'green' }} style={{height: 10 ,  backgroundColor: 'red', color: 'green' }} />
      <Headline>Reactions</Headline>
      <View style={styles.section2}>
      <Text>When: {this.state.text1}</Text> 
      <Text>(the function defined as second argument in when(), it's only fired once so the text above will never be updated again)</Text> 
      <Text>Autorun: {this.state.text2}</Text> 
      </View>
      <Divider style={{marginVertical: 20}} />
      <Button style={styles.button} disabled={!this.state.buttonEnabled} icon="camera" mode="contained" onPress={this.onButtoPress}>Dispose reactions</Button>
      </ScrollView>
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    marginTop: 60, 
    marginBottom: 40,
    marginHorizontal: 16,      
  },   
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listView: {
    flex: 1,   
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
  button: {
    marginVertical: 4,
    marginHorizontal: 16, 
  },   
});
