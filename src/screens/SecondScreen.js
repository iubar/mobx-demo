import React from 'react';
import { View, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
// Paper
import {
	Text,
	Title,
	Paragraph,
	Button,
	TextInput,
	Subheading,
	Headline,
} from 'react-native-paper';
// MobX
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class SecondScreen extends React.Component {
	defaultValue = 'cat';

	fixedSize = {
		height: 0,
		width: 0,
	};

	componentDidMount() {
		this.props.store.updateText(this.defaultValue);
	}

	onButtoPress = () => {
		console.log('Button pressed...');
		this.props.store.searchImages();
	};

	onSubmit = () => {
		console.log('onSubmit()...');
		this.props.store.searchImages();
	};

	setText = (text) => {
		console.log('Text changed...');
		this.props.store.updateText(text);
		console.log('Text on store: ' + this.props.store.text);
	};

	onItemPress = (item) => {
		console.log('Click...' + item.id);
	};

	renderItem = ({ item }) => {
		// console.log('Rendering item...');
		let width = item.width;
		let height = item.height;
		let scale = 0.05;
		// I can resize an image on its size...
		let width2 = width * scale;
		let height2 = height * scale;
		// ...or I can resize all images on the first picture size
		if (this.fixedSize.width == 0 || this.fixedSize.height == 0) {
			this.fixedSize.width = width * scale;
			this.fixedSize.height = height * scale;
		}

		return (
			<TouchableOpacity onPress={() => this.onItemPress(item)}>
				{/*<Text>{item.id}</Text>*/}
				<Image
					style={[styles.item, { width: this.fixedWidth, height: this.fixedHeight }]}
					source={{ uri: item.urls.small }}
				/>
			</TouchableOpacity>
		);
	};

	render() {
		/*    
console.log('Render di SecondScreen');    
if(this.props.store.data){
    console.log('this.props.store.data.results size: ' + this.props.store.data.length);
}
*/

		return (
			<SafeAreaView style={styles.container}>
				<Subheading style={styles.title}>
					Images found: {this.props.store.data.results.length}
				</Subheading>
				<TextInput // TextInput to get search query from user
					style={styles.input}
					defaultValue={this.defaultValue}
					mode="outlined"
					label="Describe the picture to search"
					returnKeyType="search"
					autoFocus={true}
					onChangeText={(text) => this.setText(text)}
					onSubmitEditing={this.onSubmit}
					clearButtonMode="while-editing"
				/>

				<Button
					style={styles.button}
					disabled={!this.props.store.buttonEnabled}
					icon="camera"
					mode="contained"
					onPress={this.onButtoPress}>
					Search
				</Button>

				<Text>Results found {this.props.store.data.results.length}</Text>

				<FlatList
					style={styles.list}
					data={this.props.store.data.results} // response from API
					keyExtractor={(item) => item.id}
					renderItem={this.renderItem}
				/>
			</SafeAreaView>
		);
	}
} // end class

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 60,
	},
	title: {
		textAlign: 'center',
	},
	list: {
		flex: 1,
	},
	input: {
		marginVertical: 4,
		marginHorizontal: 16,
	},
	button: {
		marginVertical: 4,
		marginHorizontal: 16,
	},
	image: {
		width: 166,
		height: 166,
	},
	item: {
		padding: 20,
		marginVertical: 4,
		marginHorizontal: 16,
	},
});
