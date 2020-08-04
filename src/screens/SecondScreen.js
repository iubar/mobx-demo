import React from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
// Paper
import { Text, Paragraph , Button, TextInput} from 'react-native-paper';
// MobX
import { inject, observer } from 'mobx-react';
 
@inject('store')
@observer
export default class SecondScreen extends React.Component {
  
  onPress = () =>{
    console.log('Button pressed...');
    this.props.store.searchImages();
  }

  setText = (text) =>{
    console.log('Text changed...');
    this.props.store.updateText(text);
    console.log('Text on store: ' + this.props.store.text);
  }  

  render(){
  return (
    <View style={styles.container}>
      <Paragraph >Images added: {this.props.store.getFavoriteCount}</Paragraph>
      <TextInput // TextInput to get search query from user 
          label='Describe the picture'
          onChangeText={text => this.setText(text)}
        />
 
  <Button icon="camera" mode="contained" onPress={this.onPress}>Search</Button>
  <FlatList
        data={this.props.store.data.results} // response from API
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image // reusable component to render image
            source={{ uri: item.urls.small }} // passing the url
 
          />
        )}
      />
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 60, 
    
  },
  
});
