import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { inject, observer } from "mobx-react";
 

@inject('store')
@observer
export default class ThirdScreen extends React.Component {
  render(){
  return (
    <View style={styles.container}>
 
  {/* TextInput and Button added earlier */}
  {/* If data is available then show search results otherwise show the favorite images */}
  {this.props.store.data ?
    <FlatList // To render list of images
      style={styles.list}
      data={this.props.store.data.results}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item.urls.small }}
          onPress={() => this.props.store.addToFavorite(item.urls.small)} // action to add url to favorite
        />
      )}
    /> :
    <FlatList
      style={styles.list}
      data={this.props.store.favorites}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <ImageView
          source={{ uri: item }} // render favorite images
        />
      )}
    />
  }
 
    </View>
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
  list: {
    flex: 1,
  },  
});
